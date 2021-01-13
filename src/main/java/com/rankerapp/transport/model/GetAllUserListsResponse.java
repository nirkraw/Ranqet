package com.rankerapp.transport.model;

import java.util.List;

public class GetAllUserListsResponse {

    private final List<ListResponse> createdLists;

    private final List<ListResponse> inProgressLists;

    private final List<ListResponse> completedLists;

    private GetAllUserListsResponse(Builder builder) {
        this.createdLists = builder.createdLists;
        this.inProgressLists = builder.inProgressLists;
        this.completedLists = builder.completedLists;
    }

    public List<ListResponse> getCreatedLists() {
        return createdLists;
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

        private List<ListResponse> createdLists;

        private List<ListResponse> inProgressLists;

        private List<ListResponse> completedLists;

        private Builder() {
        }

        public Builder createdLists(List<ListResponse> createdLists) {
            this.createdLists = createdLists;
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

        public GetAllUserListsResponse build() {
            return new GetAllUserListsResponse(this);
        }

    }
}
