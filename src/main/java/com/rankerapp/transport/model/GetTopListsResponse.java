package com.rankerapp.transport.model;

import java.util.List;

public class GetTopListsResponse {

    private final List<ListResponse> topLists;

    private GetTopListsResponse(Builder builder) {
        this.topLists = builder.topLists;
    }

    public List<ListResponse> getTopLists() {
        return topLists;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private List<ListResponse> topLists;

        private Builder() {
        }

        public Builder topLists(List<ListResponse> topLists) {
            this.topLists = topLists;
            return this;
        }

        public GetTopListsResponse build() {
            return new GetTopListsResponse(this);
        }

    }
}
