package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.UserListsRepository;
import com.rankerapp.db.model.*;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.OptionPairResponse;
import org.apache.commons.lang3.tuple.MutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class VoteProcessor {

    private static final int INITIAL_SCORE = 1400;

    private static final int K_VALUE = 30;

    private final ListsRepository listsRepo;

    private final ScoresRepository scoresRepo;

    private final UserListsRepository userListsRepo;

    @Inject
    public VoteProcessor(ListsRepository listsRepo, ScoresRepository scoresRepo, UserListsRepository userListsRepo) {
        this.listsRepo = listsRepo;
        this.scoresRepo = scoresRepo;
        this.userListsRepo = userListsRepo;
    }
    
    /**
     * Fetches the next queued option pair ids off of the persisted entity
     * Maps these ids to two options on the list and returns the pair to be voted on
     */
    public OptionPairResponse getNextPair(UUID listId, UUID userId) {
        Optional<UserListEntity> userListMaybe = userListsRepo.findByUserIdAndListId(userId, listId);
        ListEntity list = listsRepo.getOne(listId);

        if (!userListMaybe.isPresent()) {
            userListMaybe = Optional.of(persistNewUserListEntity(userId, list));
        } else if (userListMaybe.get().isCompleted()) {
            // this list is completed; return an empty response
            return OptionPairResponse.builder().build();
        }

        UserListEntity userList = userListMaybe.get();
        Pair<OptionEntity, OptionEntity> matchupPair = getNextConsecutivePair(userList, list);

        // TODO: Fetch next matchup pair if the scores for these two don't satisfy criteria.

        int numVotesRemaining = userList.getMatchupsList().size();
        int totalVoteCount = MatchupGenerator.MATCHUP_ORIENTATIONS.get(list.getOptions().size()).size();
        return OptionPairResponse.builder()
                .first(OptionsFactory.convertOption(matchupPair.getLeft()))
                .second(OptionsFactory.convertOption(matchupPair.getRight()))
                .numVotesCompleted(totalVoteCount - numVotesRemaining)
                .totalVoteCount(totalVoteCount)
                .build();
    }
    
    /**
     * Fetches the options that were voted on, calculates the new score values, and persists them to the scores repository
     */
    public OptionPairResponse castVote(UUID listId, UUID userId, UUID winningOptionId, UUID losingOptionId) {
        Optional<UserListEntity> userList = userListsRepo.findByUserIdAndListId(userId, listId);
        if (userList.isPresent() && userList.get().isCompleted()) {
            return OptionPairResponse.builder().build();
        } else if (!userList.isPresent()) {
            throw new NotFoundException(String.format("List for userId %s and listId %s not found", userId, listId));
        }

        ListEntity list = listsRepo.getOne(listId);

        // make sure the options sent in were ones we expect; ie ones next in the queue on the persisted list
        Pair<OptionEntity, OptionEntity> nextOptionPair = getNextConsecutivePair(userList.get(), list);
        String firstId = nextOptionPair.getKey().getId().toString();
        String secondId = nextOptionPair.getValue().getId().toString();
        if (!isOneOf(winningOptionId.toString(), firstId, secondId) || !isOneOf(losingOptionId.toString(), firstId, secondId)) {
            System.out.printf("Expected options: %s and %s but instead got %s and %s\n",
                    nextOptionPair.getKey().getId(), nextOptionPair.getValue().getId(),
                    winningOptionId.toString(), losingOptionId.toString());
            throw new BadRequestException(String.format("Passed in invalid next option ids. Expected %s and %s",
                    nextOptionPair.getKey().getId(), nextOptionPair.getValue().getId()));
        }

        List<ScoreEntity> scores = scoresRepo.findByListIdAndUserId(listId, userId);
        if (scores.isEmpty()) {
            scores = initializeScores(listId, userId);
        }

        // SCORE CALCULATION
        ScoreEntity winningOptionScore = findMatchingScore(scores, winningOptionId, listId, userId);
        ScoreEntity losingOptionScore = findMatchingScore(scores, losingOptionId, listId, userId);

        double winnerExpected = getExpectedScore(winningOptionScore, losingOptionScore);
        double loserExpected = 1 - winnerExpected;

        double newWinnerScore = winningOptionScore.getScore() + K_VALUE*(1 - winnerExpected);
        double newLoserScore = losingOptionScore.getScore() + K_VALUE*(0 - loserExpected);

        winningOptionScore.setScore(newWinnerScore);
        losingOptionScore.setScore(newLoserScore);

        scoresRepo.saveAll(Arrays.asList(winningOptionScore, losingOptionScore));

        // update the matchup queue
        List<String> matchupList = userList.get().getMatchupsList();
        if (matchupList.size() == 1) {
            // this was the last vote. mark as complete and return an empty pair response
            userList.get().setCompleted(true);
            userList.get().setMatchups("");
            userListsRepo.save(userList.get());

            updateGlobalListWithUserList(list, userList.get());

            return OptionPairResponse.builder().build();
        }

        // there are more matchups; fetch the next pair
        List<String> updatedMatchupList = matchupList.subList(1, matchupList.size());
        userList.get().setMatchupsList(updatedMatchupList);
        userListsRepo.save(userList.get());
        return getNextPair(listId, userId);
    }
    
    private ScoreEntity findMatchingScore(List<ScoreEntity> scores, UUID optionId, UUID listId, UUID userId) {
        return scores.stream().filter((score) -> score.getOption().getId().equals(optionId))
                .findFirst()
                .orElseThrow(() -> buildUnknownOptionIdException(optionId, listId, userId));
    }

    private Pair<OptionEntity, OptionEntity> getNextConsecutivePair(UserListEntity userList, ListEntity list) {
        String matchup = userList.getMatchupsList().get(0);

        String[] matchupPair = matchup.split(":");
        OptionEntity firstMatchupOption = list.getOptions().stream()
                .filter((op) -> op.getId().equals(UUID.fromString(matchupPair[0])))
                .findFirst().orElseThrow(() -> new RuntimeException("Something went wrong parsing matchup option"));

        OptionEntity secondMatchupOption = list.getOptions().stream()
                .filter((op) -> op.getId().equals(UUID.fromString(matchupPair[1])))
                .findFirst().orElseThrow(() -> new RuntimeException("Something went wrong parsing matching option"));

        return new MutablePair<>(firstMatchupOption, secondMatchupOption);
    }

    /**
     * Persists a new user list entity with a randomized matchup order
     */
    private UserListEntity persistNewUserListEntity(UUID userId, ListEntity list) {
        UserListEntity userListEntity = new UserListEntity();
        userListEntity.setId(UUID.randomUUID());
        userListEntity.setCompleted(false);
        userListEntity.setUserId(userId);
        userListEntity.setListId(list.getId());
        userListEntity.setCreatedOn(Instant.now());
        List<String> numberedMatchups = MatchupGenerator.MATCHUP_ORIENTATIONS.get(list.getOptions().size());
        Collections.shuffle(numberedMatchups);
        userListEntity.setMatchups(String.join(",", optionIdMappedQueue(numberedMatchups, list.getOptions())));
        userListsRepo.save(userListEntity);

        return userListEntity;
    }
    
    /**
     * Simply updates the global score by calculating the new global average with the newly completed list scores
     */
    private void updateGlobalListWithUserList(ListEntity listEntity, UserListEntity userListEntity) {
        List<ScoreEntity> globalScores = scoresRepo.findByListIdAndUserId(userListEntity.getListId(), null);
        List<ScoreEntity> userListScores = scoresRepo.findByListIdAndUserId(userListEntity.getListId(), userListEntity.getUserId());

        // this is the first time the list has been completed
        // initialize global list values
        int newNumCompletions = listEntity.getNumCompletions() + 1;
        if (globalScores.isEmpty()) {
            List<ScoreEntity> newGlobalScores = new ArrayList<>();
            for (ScoreEntity score : userListScores) {
                ScoreEntity newScore = new ScoreEntity();
                newScore.setScore(score.getScore());
                newScore.setListId(score.getListId());
                newScore.setOption(score.getOption());
                newScore.setId(UUID.randomUUID());
                newGlobalScores.add(newScore);
            }
            scoresRepo.saveAll(newGlobalScores);
        } else {
            // Update the existing global scores with these personal ranking values
            for (ScoreEntity globalScore : globalScores) {
                ScoreEntity localScore = userListScores.stream()
                        .filter((score) -> score.getOption().getId().equals(globalScore.getOption().getId()))
                        .findFirst()
                        .orElseThrow(() -> new RuntimeException("Unmatched local option with with global option!"));
                double newScore = ((globalScore.getScore() * listEntity.getNumCompletions()) + localScore.getScore()) / newNumCompletions;
                globalScore.setScore(newScore);
            }
        }

        scoresRepo.saveAll(globalScores);
        listEntity.setNumCompletions(newNumCompletions);
        listsRepo.save(listEntity);
    }

    private List<String> optionIdMappedQueue(List<String> numberedOptions, List<OptionEntity> options) {
        Map<Integer, String> numberToOptionId = new HashMap<>();
        for (OptionEntity option : options) {
            numberToOptionId.put(option.getOptionNumber(), option.getId().toString());
        }

        return numberedOptions.stream().map((option) -> {
            String[] pair = option.split(",");
            return numberToOptionId.get(Integer.parseInt(pair[0])) + ":" + numberToOptionId.get(Integer.parseInt(pair[1]));
        }).collect(Collectors.toList());
    }

    private double getExpectedScore(ScoreEntity target, ScoreEntity matchup) {
        return 1.0/(1 + Math.pow(10, (matchup.getScore() - target.getScore())/400.0));
    }

    /**
     * Create initial scores for all options in a list for a user
     */
    private List<ScoreEntity> initializeScores(UUID listId, UUID userId) {
        ListEntity list = listsRepo.getOne(listId);
        List<ScoreEntity> scoreEntities = list.getOptions().stream()
                .map((option) -> buildBaseScoreEntity(userId, option))
                .collect(Collectors.toList());

        scoresRepo.saveAll(scoreEntities);
        return scoreEntities;
    }

    private static <T> boolean isOneOf(T target, T... haystack) {
        for (T elem : haystack) {
            if (target.equals(elem)) {
                return true;
            }
        }
        return false;
    }

    private ScoreEntity buildBaseScoreEntity(UUID userId, OptionEntity option) {
        ScoreEntity scoreEntity = new ScoreEntity();
        scoreEntity.setId(UUID.randomUUID());
        scoreEntity.setListId(option.getList().getId());
        scoreEntity.setOption(option);
        scoreEntity.setScore(INITIAL_SCORE);
        scoreEntity.setUserId(userId);
        return scoreEntity;
    }

    private static IllegalArgumentException buildUnknownOptionIdException(UUID optionId, UUID listId, UUID userId) {
        String errorMessage = String.format("Option id %s does not exist for listId %s and userId %s",
                optionId, listId, userId);
        return new IllegalArgumentException(errorMessage);
    }
}
