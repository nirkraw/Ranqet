package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.UserListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.ScoreEntity;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.db.model.UserListEntity;
import com.rankerapp.transport.model.*;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ListFetcher {

    private final ListsRepository listsRepo;

    private final ScoresRepository scoresRepo;

    private final UserListsRepository userListsRepo;

    private final UsersRepository usersRepo;

    @Inject
    public ListFetcher(ListsRepository listsRepo, ScoresRepository scoresRepo, UsersRepository usersRepo,
                       UserListsRepository userListsRepo) {
        this.listsRepo = listsRepo;
        this.scoresRepo = scoresRepo;
        this.usersRepo = usersRepo;
        this.userListsRepo = userListsRepo;
    }

    public ListResponse fetchListById(UUID id) {
        ListEntity listEntity = listsRepo.getOne(id);

        List<Option> options = listEntity.getOptions().stream()
                .map(OptionsFactory::convertOption)
                .collect(Collectors.toList());

        return ListResponse.builder()
                .id(listEntity.getId().toString())
                .createdOn(listEntity.getCreatedOn())
                .description(listEntity.getDescription())
                .numCompletions(listEntity.getNumCompletions())
                .title(listEntity.getTitle())
                .options(options)
                .createdBy(UsersOperations.convertUserEntity(listEntity.getCreatedBy()))
                .build();
    }

    public RankingResponse fetchRankings(UUID listId, UUID userId) {
        List<ScoreEntity> scores = scoresRepo.findByListIdAndUserId(listId, userId);
        ListEntity list = listsRepo.getOne(listId);
        UserEntity user = usersRepo.getOne(userId);
        boolean userListIsComplete = userListsRepo.findByUserIdAndListId(userId, listId)
                .map(UserListEntity::isCompleted)
                .orElse(false);

        List<RankedOption> rankedOptions = convertAndSortList(scores);

        RankingResponse.Builder builder = RankingResponse.builder()
                .title(list.getTitle())
                .description(list.getDescription())
                .personalRanking(rankedOptions)
                .completedBy(UsersOperations.convertUserEntity(user));

        if (userListIsComplete) {
            List<ScoreEntity> globalScores = scoresRepo.findByListIdAndUserId(listId, null);
            if (globalScores.isEmpty()) {
                List<ScoreEntity> newGlobalScores = new ArrayList<>();
                for (ScoreEntity score : scores) {
                    ScoreEntity newScore = new ScoreEntity();
                    newScore.setScore(score.getScore());
                    newScore.setListId(score.getListId());
                    newScore.setOption(score.getOption());
                    newScore.setId(UUID.randomUUID());
                    newGlobalScores.add(newScore);
                }
                scoresRepo.saveAll(newGlobalScores);
                globalScores = newGlobalScores;
            }

            builder.globalRanking(convertAndSortList(globalScores));
        }

        return builder.build();
    }

    // TODO: limit number of lists returned
    public GetAllListsResponse getAllListsForUser(UUID userId) {

        List<ListEntity> lists = listsRepo.findAll();
        List<UserListEntity> userLists = userListsRepo.findByUserId(userId);
        Set<UUID> completedListIds = userLists.stream()
                .filter(UserListEntity::isCompleted)
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());

        Set<UUID> incompleteListIds = userLists.stream()
                .filter((userList) -> !userList.isCompleted())
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());

        List<ListEntity> completedLists = new ArrayList<>();
        List<ListEntity> inProgressLists = new ArrayList<>();
        List<ListEntity> newLists = new ArrayList<>();

        for (ListEntity list : lists) {
            if (completedListIds.contains(list.getId())) {
                completedLists.add(list);
            } else if (incompleteListIds.contains(list.getId())) {
                inProgressLists.add(list);
            } else {
                newLists.add(list);
            }
        }

        return GetAllListsResponse.builder()
                .newLists(newLists.stream()
                        .map(ListFetcher::convertListToResponse)
                        .collect(Collectors.toList()))
                .inProgressLists(inProgressLists.stream()
                        .map(ListFetcher::convertListToResponse)
                        .collect(Collectors.toList()))
                .completedLists(completedLists.stream()
                        .map(ListFetcher::convertListToResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    private static List<RankedOption> convertAndSortList(List<ScoreEntity> scores) {
        return scores.stream()
                .map(OptionsFactory::convertToRankedOption)
                .sorted((first, second) -> Double.compare(first.getScore(), second.getScore()) * -1)
                .collect(Collectors.toList());
    }

    private static ListResponse convertListToResponse(ListEntity listEntity) {
        List<Option> options = listEntity.getOptions().stream()
                .map(OptionsFactory::convertOption)
                .collect(Collectors.toList());

        return ListResponse.builder()
                .id(listEntity.getId().toString())
                .createdOn(listEntity.getCreatedOn())
                .description(listEntity.getDescription())
                .numCompletions(listEntity.getNumCompletions())
                .title(listEntity.getTitle())
                .options(options)
                .createdBy(UsersOperations.convertUserEntity(listEntity.getCreatedBy()))
                .build();
    }




}
