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
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ListFetcher {

    private static final int TOP_LIST_SIZE = 10;

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

    public GetTopListsResponse getTopLists() {
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("numCompletions")));
        List<ListResponse> topLists = listsRepo.findAll(pageRequest)
                .map(ListFetcher::convertListToResponse)
                .getContent();
        return GetTopListsResponse.builder()
                .topLists(topLists)
                .build();
    }

    // TODO: limit number of lists returned
    public GetAllUserListsResponse getAllListsForUser(UUID userId) {

        List<UserListEntity> userLists = userListsRepo.findByUserId(userId);
        Set<UUID> completedListIds = userLists.stream()
                .filter(UserListEntity::isCompleted)
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());

        Set<UUID> incompleteListIds = userLists.stream()
                .filter((userList) -> !userList.isCompleted())
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());

        List<ListEntity> completedLists = listsRepo.findAllById(completedListIds);
        List<ListEntity> inProgressLists = listsRepo.findAllById(incompleteListIds);
        List<ListEntity> createdLists = listsRepo.findByCreatedBy(userId);

        return GetAllUserListsResponse.builder()
                .createdLists(createdLists.stream()
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
