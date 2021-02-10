package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.List;
import java.util.Objects;

public class GetCommentsResponse {

    private final List<Comment> comments;

    private GetCommentsResponse(Builder builder) {
        this.comments = builder.comments;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private List<Comment> comments;

        public Builder withComments(List<Comment> comments) {
            this.comments = comments;
            return this;
        }
        public GetCommentsResponse build() {
            return new GetCommentsResponse(this);
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
        GetCommentsResponse that = (GetCommentsResponse) o;
        return Objects.equals(comments, that.getComments());
    }

    @Override
    public int hashCode() {
        return Objects.hash(comments);
    }

}
