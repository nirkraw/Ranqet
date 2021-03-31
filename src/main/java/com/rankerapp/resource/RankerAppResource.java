package com.rankerapp.resource;

import com.rankerapp.core.*;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.transport.model.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
public class RankerAppResource {

    private final ListWriter listWriter;

    private final ListFetcher listFetcher;

    private final ListDeleter listDeleter;

    private final VoteProcessor voteProcessor;
    
    private final PresetsManager presetsManager;

    @Inject
    public RankerAppResource(ListWriter listWriter, ListFetcher listFetcher,
                             ListDeleter listDeleter, VoteProcessor voteProcessor, PresetsManager presetsManager) {
        this.listWriter = listWriter;
        this.listFetcher = listFetcher;
        this.listDeleter = listDeleter;
        this.voteProcessor = voteProcessor;
        this.presetsManager = presetsManager;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/list/create")
    public ListResponse createNewList(@RequestBody CreateListRequest request) {
        UUID authorId = UUID.fromString(request.getAuthorId());
        UUID persistedId = listWriter.createList(request.getTitle(), request.getDescription(),
                authorId, request.getOptions(), request.getImageUrl(),
                request.getCategory(), request.isUnlisted()).getId();
        
        if (request.getPresetTitle().isPresent()) {
            List<PresetOption> presetOptions =
                    request.getOptions().stream()
                            .map((option) -> new PresetOption(option.getName(), option.getImageUrl()))
                            .collect(Collectors.toList());
            presetsManager.createPreset(request.getPresetTitle().get(), authorId, presetOptions);
        }

        return listFetcher.fetchListById(persistedId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/list/{listId}")
    public void deleteList(@PathVariable(value = "listId") String listId, @RequestParam(value = "userId") String userId,
                           @RequestParam(value = "sessionToken") String sessionToken) {
        listDeleter.deleteList(UUID.fromString(listId), UUID.fromString(userId), sessionToken);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/lists/{listId}/privacy-toggle")
    public void togglePrivacyForList(@PathVariable(value = "listId") String listId, @RequestBody TogglePrivacyRequest request) {
        listWriter.toggleListPrivacy(asUUID(listId), asUUID(request.getUserId()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/top")
    public GenericListsResponse getTopLists(@RequestParam(value = "category", required = false) ListCategory listCategory) {
        if (Objects.isNull(listCategory)) {
            return listFetcher.getTopLists();
        }
        return listFetcher.getTopListsByCategory(listCategory);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/new")
    public GenericListsResponse getNewLists() {
        return listFetcher.getNewLists();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists")
    public GenericListsResponse getLists(@RequestParam(value = "userId") String userId,
        @RequestParam(value = "sessionToken") String sessionToken, @RequestParam(value = "category") ListCategory category) {
        if (Objects.isNull(category)) {
            throw new BadRequestException("category query param is required");
        } else if (asNullableUUID(userId) != null && StringUtils.isEmpty(sessionToken)) {
            throw new BadRequestException("session token param is required");
        }
        
        if (category == ListCategory.POPULAR) {
            return listFetcher.getTopLists(asNullableUUID(userId), sessionToken);
        } else if (category == ListCategory.NEW) {
            return listFetcher.getNewLists(asNullableUUID(userId), sessionToken);
        } else {
            return listFetcher.getTopListsByCategory(asNullableUUID(userId), sessionToken, category);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/search")
    public GenericListsResponse searchForListsByName(@RequestParam("userId") String userId,
          @RequestParam String sessionToken, @RequestParam(value = "query") String query) {
        if (StringUtils.isEmpty(query)) {
            return GenericListsResponse.builder()
                    .lists(Collections.emptyList())
                    .build();
        }

        List<ListResponse> searchResults = listFetcher.searchForListsByName(asNullableUUID(userId), sessionToken, query);
        return GenericListsResponse.builder()
                .lists(searchResults)
                .build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/user/{userId}/all")
    // TODO: Separate these out into individual endpoints
    public GetAllUserListsResponse getAllUserLists(@PathVariable(value = "userId") String userId,
            @RequestParam(value = "sessionToken") String sessionToken) {
        if (StringUtils.isEmpty(sessionToken)) {
            throw new BadRequestException("Getting lists for a user requires a user session token");
        }

        return listFetcher.getAllListsForUser(asUUID(userId), sessionToken);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/user/{userId}")
    public GenericListsResponse getUserLists(@PathVariable(value = "userId") String userId,
        @RequestParam(value = "sessionToken") String sessionToken, @RequestParam(value = "filter") UserListFilter filter) {
        if (StringUtils.isAnyEmpty(userId, sessionToken) || Objects.isNull(filter)) {
            throw new BadRequestException("Fetching user lists requires a userId, a sessionToken, and a filter");
        }
        
        List<ListResponse> results;
        switch (filter) {
            case CREATED:
                results = listFetcher.getCreatedLists(asUUID(userId), sessionToken);
                break;
            case COMPLETED:
                results = listFetcher.getCompletedLists(asUUID(userId), sessionToken);
                break;
            case IN_PROGRESS:
                results = listFetcher.getInProgressLists(asUUID(userId), sessionToken);
                break;
            default:
                throw new BadRequestException("Unsupported filter type: " + filter);
        }
        
        return GenericListsResponse.builder()
                .lists(results)
                .build();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/user/{userId}/public")
    public GenericListsResponse getAllPublicListsForUser(@PathVariable(value = "userId") String userId) {
        List<ListResponse> publicLists = listFetcher.getAllPublicListsForUser(asUUID(userId));
        return GenericListsResponse.builder()
                .lists(publicLists)
                .build();
    }

    // Filter by completed, in progress and by userId
    // Return info
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/{listId}")
    public ListResponse getList(@PathVariable(value = "listId") String listId) {
        return listFetcher.fetchListById(UUID.fromString(listId));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/{listId}/nextPair")
    public OptionPairResponse getNextPair(@PathVariable(value = "listId") String listId,
                                  @RequestParam(value = "userId") String userId) {
        return voteProcessor.getNextPair(asUUID(listId), asUUID(userId));
    }

    // Expose vote endpoint to cast a vote on a list
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/list/{listId}/vote")
    public OptionPairResponse castVote(@PathVariable(value = "listId") String listId, @RequestBody CastVoteRequest request) {
        return voteProcessor.castVote(asUUID(listId), asUUID(request.getUserId()),
                asUUID(request.getWinningOptionId()), asUUID(request.getLosingOptionId()));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/{listId}/rankings/personal")
    public RankingResponse getPersonalRankings(@PathVariable(value = "listId") String listId,
                                       @RequestParam(value = "userId") String userId) {
        // Return personal ranking if user has completed list. Otherwise 403 FORBIDDEN
        return listFetcher.fetchPersonalRankings(asUUID(listId), asUUID(userId));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/{listId}/rankings/global")
    public RankingResponse getGlobalRankings(@PathVariable(value = "listId") String listId) {
        // Return global ranking if list has been completed at least once. Otherwise return empty list
        return listFetcher.fetchGlobalRankings(asUUID(listId));
    }

    private static UUID asUUID(String id) {
        if (id == null || id.isEmpty()) {
            throw new BadRequestException("Empty UUID is invalid");
        }
        return UUID.fromString(id);
    }
    
    private static UUID asNullableUUID(String id) {
        if (StringUtils.trimToNull(id) == null) {
            return null;
        }
        
        return asUUID(id);
    }
}