package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.UserListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.ScoreEntity;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.db.model.UserListEntity;
import com.rankerapp.exceptions.ForbiddenException;
import com.rankerapp.transport.model.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ListFetcher {

    private static final int TOP_LIST_SIZE = 10;

    private final ListsRepository listsRepo;

    private final ScoresRepository scoresRepo;

    private final UserListsRepository userListsRepo;

    private final UsersRepository usersRepo;

    private final SessionTokenAuthenticator sessionTokenAuthenticator;

    @Inject
    public ListFetcher(ListsRepository listsRepo, ScoresRepository scoresRepo, UsersRepository usersRepo,
                       UserListsRepository userListsRepo, SessionTokenAuthenticator sessionTokenAuthenticator) {
        this.listsRepo = listsRepo;
        this.scoresRepo = scoresRepo;
        this.usersRepo = usersRepo;
        this.userListsRepo = userListsRepo;
        this.sessionTokenAuthenticator = sessionTokenAuthenticator;
    }

    public ListResponse fetchListById(UUID id) {
        ListEntity listEntity = listsRepo.getOne(id);

        return convertListToResponse(listEntity);
    }

    public RankingResponse fetchPersonalRankings(UUID listId, UUID userId) {
        List<ScoreEntity> scores = scoresRepo.findByListIdAndUserId(listId, userId);
        ListEntity list = listsRepo.getOne(listId);
        UserEntity user = usersRepo.getOne(userId);
        boolean userListIsComplete = userListsRepo.findByUserIdAndListId(userId, listId)
                .map(UserListEntity::isCompleted)
                .orElse(false);

        if (!userListIsComplete) {
            throw new ForbiddenException("Cannot fetch personal rankings for a list that is incomplete");
        }

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
        }

        List<RankedOption> rankedOptions = convertAndSortList(scores);

        return RankingResponse.builder()
                .title(list.getTitle())
                .description(list.getDescription())
                .ranking(rankedOptions)
                .completedBy(UsersOperations.convertUserEntity(user))
                .build();
    }

    public RankingResponse fetchGlobalRankings(UUID listId) {
        List<ScoreEntity> globalScores = scoresRepo.findByListIdAndUserId(listId, null);
        ListEntity list = listsRepo.getOne(listId);

        if (globalScores.isEmpty()) {
            // no global scores exist yet
            return RankingResponse.builder()
                    .ranking(Collections.emptyList())
                    .completedBy(null)
                    .title(list.getTitle())
                    .description(list.getDescription())
                    .build();
        }


        return RankingResponse.builder()
                .title(list.getTitle())
                .description(list.getDescription())
                .ranking(convertAndSortList(globalScores))
                .completedBy(null)
                .build();
    }

    @Transactional
    public GenericListsResponse getTopLists() {
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("numCompletions")));
        List<ListResponse> topLists = listsRepo.findByIsPrivate(false, pageRequest)
                .map(ListFetcher::convertListToResponse)
                .collect(Collectors.toList());
        return GenericListsResponse.builder()
                .lists(topLists)
                .build();
    }

    @Transactional
    public GenericListsResponse getTopListsByCategory(ListCategory listCategory) {
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("numCompletions")));
        com.rankerapp.db.model.ListCategory category = com.rankerapp.db.model.ListCategory.valueOf(listCategory.name());
        List<ListResponse> topLists = listsRepo.findByCategoryAndIsPrivate(category, false, pageRequest)
                .map(ListFetcher::convertListToResponse)
                .collect(Collectors.toList());
        return GenericListsResponse.builder()
                .lists(topLists)
                .build();
    }

    @Transactional
    public GenericListsResponse getNewLists() {
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("createdOn")));
        List<ListResponse> topLists = listsRepo.findByIsPrivate(false, pageRequest)
                .map(ListFetcher::convertListToResponse)
                .collect(Collectors.toList());
        return GenericListsResponse.builder()
                .lists(topLists)
                .build();
    }

    // TODO: limit number of lists returned
    public GetAllUserListsResponse getAllListsForUser(UUID userId, String sessionToken) {

        sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);

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
        UserEntity createdBy = new UserEntity();
        createdBy.setId(userId);
        List<ListEntity> createdLists = listsRepo.findByCreatedBy(createdBy);

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

    public List<ListResponse> getAllPublicListsForUser(UUID userId) {
        UserEntity createdBy = new UserEntity();
        createdBy.setId(userId);
        return listsRepo.findByCreatedByAndIsPrivate(createdBy, false)
                .stream()
                .map(ListFetcher::convertListToResponse)
                .sorted((a, b) -> Integer.compare(a.getNumCompletions(), b.getNumCompletions()))
                .collect(Collectors.toList());
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
                .imageUrl(listEntity.getImageUrl())
                .isUnlisted(listEntity.isPrivate())
                .category(listEntity.getCategory().toTransportModel())
                .build();
    }




}
