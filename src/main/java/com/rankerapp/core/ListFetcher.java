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
import java.util.List;
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
                .options(rankedOptions)
                .completedBy(UsersOperations.convertUserEntity(user));

        if (userListIsComplete) {
            List<ScoreEntity> globalScores = scoresRepo.findByListIdAndUserId(listId, null);
            builder.globalOptions(convertAndSortList(globalScores));
        }

        return builder.build();
    }

    public GetAllListsResponse getAllLists() {
        List<ListEntity> lists = listsRepo.findAll();
        return GetAllListsResponse.builder()
                .lists(lists.stream()
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
