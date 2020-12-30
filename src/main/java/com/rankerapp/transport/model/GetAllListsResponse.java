package com.rankerapp.transport.model;

import java.util.List;

public class GetAllListsResponse {

    private final List<ListResponse> lists;

    private GetAllListsResponse(Builder builder) {
        this.lists = builder.lists;
    }

    public List<ListResponse> getLists() {
        return lists;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private List<ListResponse> lists;

        private Builder() {
        }

        public Builder lists(List<ListResponse> lists) {
            this.lists = lists;
            return this;
        }

        public GetAllListsResponse build() {
            return new GetAllListsResponse(this);
        }

    }
}
