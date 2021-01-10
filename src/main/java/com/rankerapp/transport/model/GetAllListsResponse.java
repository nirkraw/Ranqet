package com.rankerapp.transport.model;

import java.util.List;

public class GetAllListsResponse {

    private final List<ListResponse> newLists;

    private final List<ListResponse> inProgressLists;

    private final List<ListResponse> completedLists;

    private GetAllListsResponse(Builder builder) {
        this.newLists = builder.newLists;
        this.inProgressLists = builder.inProgressLists;
        this.completedLists = builder.completedLists;
    }

    public List<ListResponse> getNewLists() {
        return newLists;
    }

    public List<ListResponse> getInProgressLists() {
        return inProgressLists;
    }

    public List<ListResponse> getCompletedLists() {
        return completedLists;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private List<ListResponse> newLists;

        private List<ListResponse> inProgressLists;

        private List<ListResponse> completedLists;

        private Builder() {
        }

        public Builder newLists(List<ListResponse> newLists) {
            this.newLists = newLists;
            return this;
        }

        public Builder inProgressLists(List<ListResponse> inProgressLists) {
            this.inProgressLists = inProgressLists;
            return this;
        }

        public Builder completedLists(List<ListResponse> completedLists) {
            this.completedLists = completedLists;
            return this;
        }

        public GetAllListsResponse build() {
            return new GetAllListsResponse(this);
        }

    }
}
