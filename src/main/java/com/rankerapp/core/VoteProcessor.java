package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.OptionEntity;
import com.rankerapp.db.model.ScoreEntity;

import javax.inject.Inject;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class VoteProcessor {

    private static final int INITIAL_SCORE = 1400;

    private static final int K_VALUE = 30;

    private final ListsRepository listsRepo;

    private final ScoresRepository scoresRepo;

    @Inject
    public VoteProcessor(ListsRepository listsRepo, ScoresRepository scoresRepo) {
        this.listsRepo = listsRepo;
        this.scoresRepo = scoresRepo;
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
