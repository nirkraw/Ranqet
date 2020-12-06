package com.rankerapp.resource;

import com.rankerapp.core.ListFetcher;
import com.rankerapp.core.ListWriter;
import com.rankerapp.core.VoteProcessor;
import com.rankerapp.transport.model.CastVoteRequest;
import com.rankerapp.transport.model.CreateListRequest;
import com.rankerapp.transport.model.ListResponse;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.UUID;

@RestController
public class RankerAppResource {

    private final ListWriter listWriter;

    private final ListFetcher listFetcher;

    private final VoteProcessor voteProcessor;

    @Inject
    public RankerAppResource(ListWriter listWriter, ListFetcher listFetcher, VoteProcessor voteProcessor) {
        this.listWriter = listWriter;
        this.listFetcher = listFetcher;
        this.voteProcessor = voteProcessor;
    }

    @PostMapping("/list/create")
    public ListResponse createNewList(@RequestBody CreateListRequest request) {
        UUID persistedId = listWriter.createList(request.getName(), request.getDescription(),
                UUID.fromString(request.getAuthorId()), request.getOptions()).getId();

        return listFetcher.fetchListById(persistedId);
    }

    @GetMapping("/list/{listId}/")
    public ListResponse getList(@PathVariable(value = "listId") String listId) {
        return listFetcher.fetchListById(UUID.fromString(listId));
    }

    @GetMapping("/list/{listId}/nextPair")
    public void getNextPair(@PathVariable(value = "listId") String listId,
                                  @RequestParam(value = "userId") String userId) {
        // Implement this;
        //Params params = new Params(listId, userId);

    }

    // Expose vote endpoint to cast a vote on a list
    @PostMapping("/list/{listId}/vote")
    public void castVote(@PathVariable(value = "listId") String listId, @RequestBody CastVoteRequest request) {
        voteProcessor.castVote(asUUID(listId), asUUID(request.getUserId()),
                asUUID(request.getWinningOptionId()), asUUID(request.getLosingOptionId()));
    }

    @GetMapping("/list/{listId}/rankings")
    public void getRankings(@PathVariable(value = "listId") String listId,
                            @RequestParam(value = "userId") String userId) {
        // Implement this;
        System.out.println(listId + " " + userId);
    }

    private static UUID asUUID(String id) {
        return UUID.fromString(id);
    }
}