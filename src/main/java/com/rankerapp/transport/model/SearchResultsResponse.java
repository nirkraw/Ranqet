package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.List;
import java.util.Objects;

public class SearchResultsResponse {

    private final String searchQuery;

    private final List<ListResponse> results;

    private SearchResultsResponse(Builder builder) {
        this.searchQuery = builder.searchQuery;
        this.results = builder.results;
    }

    public String getSearchQuery() {
        return this.searchQuery;
    }

    public List<ListResponse> getResults() {
        return this.results;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String searchQuery;

        private List<ListResponse> results;

        public Builder withSearchQuery(String searchQuery) {
            this.searchQuery = searchQuery;
            return this;
        }

        public Builder withResults(List<ListResponse> results) {
            this.results = results;
            return this;
        }
        public SearchResultsResponse build() {
            return new SearchResultsResponse(this);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SearchResultsResponse that = (SearchResultsResponse) o;
        return Objects.equals(searchQuery, that.getSearchQuery())
                && Objects.equals(results, that.getResults());
    }

    @Override
    public int hashCode() {
        return Objects.hash(searchQuery, results);
    }

}