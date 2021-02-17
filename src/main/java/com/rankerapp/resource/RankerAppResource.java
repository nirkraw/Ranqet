package com.rankerapp.resource;

import com.rankerapp.core.ListDeleter;
import com.rankerapp.core.ListFetcher;
import com.rankerapp.core.ListWriter;
import com.rankerapp.core.VoteProcessor;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.transport.model.*;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Objects;
import java.util.UUID;

@RestController
public class RankerAppResource {

    private final ListWriter listWriter;

    private final ListFetcher listFetcher;

    private final ListDeleter listDeleter;

    private final VoteProcessor voteProcessor;

    @Inject
    public RankerAppResource(ListWriter listWriter, ListFetcher listFetcher,
                             ListDeleter listDeleter, VoteProcessor voteProcessor) {
        this.listWriter = listWriter;
        this.listFetcher = listFetcher;
        this.listDeleter = listDeleter;
        this.voteProcessor = voteProcessor;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/list/create")
    public ListResponse createNewList(@RequestBody CreateListRequest request) {
        UUID persistedId = listWriter.createList(request.getTitle(), request.getDescription(),
                UUID.fromString(request.getAuthorId()), request.getOptions(), request.getImageUrl(),
                request.getCategory(), request.isUnlisted()).getId();

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
    public GetTopListsResponse getTopLists(@RequestParam(value = "category", required = false) ListCategory listCategory) {
        if (Objects.isNull(listCategory)) {
            return listFetcher.getTopLists();
        }
        return listFetcher.getTopListsByCategory(listCategory);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/new")
    public GetTopListsResponse getNewLists() {
        return listFetcher.getNewLists();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/lists/user/{userId}/all")
    public GetAllUserListsResponse getAllUserLists(@PathVariable(value = "userId") String userId) {
        return listFetcher.getAllListsForUser(asUUID(userId));
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
}