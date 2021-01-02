package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.UserListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.*;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
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

    public void getNextPair(UUID listId, UUID userId) {
        ListEntity list = listsRepo.getOne(listId);

        Optional<UserListEntity> userListMaybe = userListsRepo.findByUserIdAndListId(userId, listId);

        if (!userListMaybe.isPresent()) {
            userListMaybe = Optional.of(persistNewUserListEntity(userId, list));
        }

        UserListEntity userList = userListMaybe.get();
        String matchup = userList.getMatchupsList().get(0);

        String[] matchupPair = matchup.split(":");
        OptionEntity firstMatchupOption = list.getOptions().stream()
                .filter((op) -> op.getId().equals(UUID.fromString(matchupPair[0])))
                .findFirst().orElseThrow(() -> new RuntimeException("Something went wrong parsing matchup option"));

        OptionEntity secondMatchupOption = list.getOptions().stream()
                .filter((op) -> op.getId().equals(UUID.fromString(matchupPair[1])))
                .findFirst().orElseThrow(() -> new RuntimeException("Something went wrong parsing matching option"));

        // TODO: Fetch next matchup pair if the scores for these two don't satisfy criteria.
    }

    public void castVote(UUID listId, UUID userId, UUID winningOptionId, UUID losingOptionId) {
        List<ScoreEntity> scores = scoresRepo.findByListIdAndUserId(listId, userId);
        if (scores.isEmpty()) {
            scores = initializeScores(listId, userId);
        }

        ScoreEntity winningOptionScore = scores.stream().filter((score) -> score.getOption().getId().equals(winningOptionId))
                .findFirst()
                .orElseThrow(() -> buildUnknownOptionIdException(winningOptionId, listId, userId));

        ScoreEntity losingOptionScore = scores.stream().filter((score) -> score.getOption().getId().equals(losingOptionId))
                .findFirst()
                .orElseThrow(() -> buildUnknownOptionIdException(losingOptionId, listId, userId));

        double winnerExpected = getExpectedScore(winningOptionScore, losingOptionScore);
        double loserExpected = 1 - winnerExpected;

        double newWinnerScore = winningOptionScore.getScore() + K_VALUE*(1 - winnerExpected);
        double newLoserScore = losingOptionScore.getScore() + K_VALUE*(0 - loserExpected);

        winningOptionScore.setScore(newWinnerScore);
        losingOptionScore.setScore(newLoserScore);

        scoresRepo.saveAll(Arrays.asList(winningOptionScore, losingOptionScore));

        // update the queue;

    }

    /**
     * Persists a new user list entity with a randomized matchup order
     */
    private UserListEntity persistNewUserListEntity(UUID userId, ListEntity list) {
        UserListEntity userListEntity = new UserListEntity();
        userListEntity.setCompleted(false);
        userListEntity.setUserId(userId);
        userListEntity.setListId(list.getId());
        List<String> numberedMatchups = MatchupGenerator.MATCHUP_ORIENTATIONS.get(list.getOptions().size());
        Collections.shuffle(numberedMatchups);
        userListEntity.setMatchups(String.join(",", optionIdMappedQueue(numberedMatchups, list.getOptions())));
        userListsRepo.save(userListEntity);

        return userListEntity;
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
