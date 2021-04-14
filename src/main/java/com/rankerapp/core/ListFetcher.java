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
import org.apache.commons.lang3.StringUtils;
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
    
    private static final int SEARCH_RESULT_LIMIT = 10;

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
    public GenericListsResponse getTopLists(UUID userId, String sessionToken) {
        boolean userPresent = userId != null;
        
        if (userPresent) {
            sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
        }
        
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("numCompletions")));
        List<ListEntity> topLists = listsRepo.findByIsPrivate(false, pageRequest)
                .collect(Collectors.toList());
        
        Set<UUID> completedUserListIds = userPresent ? getCompletedListIdsForUser(userId, topLists.stream()
                .map(ListEntity::getId)
                .collect(Collectors.toList())) : Collections.emptySet();
        
        List<ListResponse> resolvedTopLists = topLists.stream()
                .map((list) -> ListFetcher.convertListToResponse(list,
                        userPresent ? completedUserListIds.contains(list.getId()) : true))
                .collect(Collectors.toList());
        
        return GenericListsResponse.builder()
                .lists(resolvedTopLists)
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
    public GenericListsResponse getTopListsByCategory(UUID userId, String sessionToken, ListCategory listCategory) {
        boolean userPresent = userId != null;
        if (userPresent) {
            sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
        }
    
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("numCompletions")));
        com.rankerapp.db.model.ListCategory category = com.rankerapp.db.model.ListCategory.valueOf(listCategory.name());
        List<ListEntity> topLists = listsRepo.findByCategoryAndIsPrivate(category, false, pageRequest)
                .collect(Collectors.toList());
        
        Set<UUID> completedUserListIds = userPresent ? getCompletedListIdsForUser(userId, topLists.stream()
                .map(ListEntity::getId)
                .collect(Collectors.toList())) : Collections.emptySet();
        
        List<ListResponse> resolvedTopLists = topLists.stream()
                .map((list) -> ListFetcher.convertListToResponse(list, userPresent ? completedUserListIds.contains(list.getId()) : true))
                .collect(Collectors.toList());
        
        return GenericListsResponse.builder()
                .lists(resolvedTopLists)
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
    
    @Transactional
    public GenericListsResponse getNewLists(UUID userId, String sessionToken) {
        boolean userPresent = userId != null;
        if (userPresent) {
            sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
        }
    
        PageRequest pageRequest =
                PageRequest.of(0, TOP_LIST_SIZE, Sort.by(Sort.Order.desc("createdOn")));
        List<ListEntity> topLists = listsRepo.findByIsPrivate(false, pageRequest)
                .collect(Collectors.toList());
    
        Set<UUID> completedUserListIds = userPresent ? getCompletedListIdsForUser(userId, topLists.stream()
                .map(ListEntity::getId)
                .collect(Collectors.toList())) : Collections.emptySet();
    
        List<ListResponse> resolvedTopLists = topLists.stream()
                .map((list) -> ListFetcher.convertListToResponse(list, userPresent ? completedUserListIds.contains(list.getId()) : true))
                .collect(Collectors.toList());
        
        return GenericListsResponse.builder()
                .lists(resolvedTopLists)
                .build();
    }

    // TODO: limit number of lists returned
    @Deprecated
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
    
    @Transactional
    public List<ListResponse> getCompletedLists(UUID userId, String sessionToken) {
        sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
        List<UserListEntity> userLists = userListsRepo.findByUserIdAndIsCompleted(userId, true);
        Set<UUID> completedListIds = userLists.stream()
                .filter(UserListEntity::isCompleted)
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());
    
        return listsRepo.findAllById(completedListIds).stream()
                .map((list) -> ListFetcher.convertListToResponse(list, true))
                .collect(Collectors.toList());
    }
    
    @Transactional
    public List<ListResponse> getInProgressLists(UUID userId, String sessionToken) {
        sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
    
        List<UserListEntity> userLists = userListsRepo.findByUserIdAndIsCompleted(userId, false);
        
        Set<UUID> incompleteListIds = userLists.stream()
                .filter((userList) -> !userList.isCompleted())
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());
        
        return listsRepo.findAllById(incompleteListIds).stream()
                .map((list) -> ListFetcher.convertListToResponse(list, false))
                .collect(Collectors.toList());
    }
    
    @Transactional
    // TODO: order by most recently created first?
    public List<ListResponse> getCreatedLists(UUID userId, String sessionToken) {
        sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
    
        Set<UUID> completedUserLists = userListsRepo.findByUserIdAndIsCompleted(userId, true).stream()
                .map(UserListEntity::getListId)
                .collect(Collectors.toSet());
    
        UserEntity createdBy = new UserEntity();
        createdBy.setId(userId);
        return listsRepo.findByCreatedBy(createdBy).stream()
                .map((list) -> ListFetcher.convertListToResponse(list, completedUserLists.contains(list.getId())))
                .collect(Collectors.toList());
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

    public List<ListResponse> searchForListsByName(UUID userId, String sessionToken, String query) {
        final Set<UUID> completedLists;
        if (userId != null) {
            sessionTokenAuthenticator.verifySessionToken(userId, sessionToken);
            completedLists = userListsRepo.findByUserIdAndIsCompleted(userId, true).stream()
                    .map(UserListEntity::getListId)
                    .collect(Collectors.toSet());
        } else {
            completedLists = Collections.emptySet();
        }
        
        return listsRepo.searchByNameContaining(StringUtils.strip(query)).stream()
                .limit(SEARCH_RESULT_LIMIT)
                .map((list) -> convertListToResponse(list, (userId != null) && completedLists.contains(list.getId())))
                .collect(Collectors.toList());
    }
    
    // finds the listIds in a set that were completed by a user
    private Set<UUID> getCompletedListIdsForUser(UUID userId, List<UUID> listIds) {
        return userListsRepo.findByUserIdAndListIdInAndIsCompleted(userId, listIds, true)
                .stream().map(UserListEntity::getListId).collect(Collectors.toSet());
    }

    private static List<RankedOption> convertAndSortList(List<ScoreEntity> scores) {
        return scores.stream()
                .map(OptionsFactory::convertToRankedOption)
                .sorted((first, second) -> Double.compare(first.getScore(), second.getScore()) * -1)
                .collect(Collectors.toList());
    }

    private static ListResponse convertListToResponse(ListEntity listEntity) {
        return convertListToResponse(listEntity, false);
    }
    
    private static ListResponse convertListToResponse(ListEntity listEntity, boolean completed) {
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
                .isCompleted(completed)
                .build();
    }




}
