package com.rankerapp.resource;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.rankerapp.transport.model.CastVoteRequest;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;

@RestController
public class RankerAppResource {

    @GetMapping("/greeting")
    public SampleResponse greeting(@RequestParam(value = "name") String name) {
        System.out.println("Hello " + name);

        return SampleResponse.builder()
                .first("aaaa")
                .second(3)
                .third(Instant.now())
                .build();
    }

    @GetMapping("/{listId}/nextPair")
    public void getNextPair(@PathVariable(value = "listId") String listId,
                                  @RequestParam(value = "userId") String userId) {
        // Implement this;
        //Params params = new Params(listId, userId);

    }

    // Expose vote endpoint to cast a vote on a list
    @PostMapping("/{listId}/vote")
    public void castVote(@PathVariable(value = "listId") String listId, @RequestBody CastVoteRequest request) {
        // Implement this;
    }

    @GetMapping("/{listId}/rankings")
    public void getRankings(@PathVariable(value = "listId") String listId,
                            @RequestParam(value = "userId") String userId) {
        // Implement this;
        System.out.println(listId + " " + userId);
    }

    @JsonSerialize
    public static class SampleResponse {
        private final String first;

        private final int second;

        private final Instant third;

        private SampleResponse(Builder builder) {
            this.first = builder.first;
            this.second = builder.second;
            this.third = builder.third;
        }


        public String getFirst() {
            return first;
        }

        public int getSecond() {
            return second;
        }

        public Instant getThird() {
            return third;
        }

        public static Builder builder() {
            return new Builder();
        }

        public static final class Builder {

            private String first;

            private int second;

            private Instant third;

            public Builder first(String first) {
                this.first = first;
                return this;
            }

            public Builder second(int second) {
                this.second = second;
                return this;
            }

            public Builder third(Instant third) {
                this.third = third;
                return this;
            }

            public SampleResponse build() {
                return new SampleResponse(this);
            }

        }

    }
}