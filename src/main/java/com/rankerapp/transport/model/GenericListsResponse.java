package com.rankerapp.transport.model;

import java.util.List;

public class GenericListsResponse {

    private final List<ListResponse> lists;

    private GenericListsResponse(Builder builder) {
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

        public GenericListsResponse build() {
            return new GenericListsResponse(this);
        }

    }
}
