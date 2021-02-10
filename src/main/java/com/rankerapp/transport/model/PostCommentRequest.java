package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.Objects;

public class PostCommentRequest {

    private final String userId;

    private final String sessionToken;

    private final String comment;

    private PostCommentRequest(Builder builder) {
        this.userId = builder.userId;
        this.sessionToken = builder.sessionToken;
        this.comment = builder.comment;
    }

    public String getUserId() {
        return this.userId;
    }

    public String getSessionToken() {
        return this.sessionToken;
    }

    public String getComment() {
        return this.comment;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String userId;

        private String sessionToken;

        private String comment;

        public Builder withUserId(String userId) {
            this.userId = userId;
            return this;
        }

        public Builder withSessionToken(String sessionToken) {
            this.sessionToken = sessionToken;
            return this;
        }

        public Builder withComment(String comment) {
            this.comment = comment;
            return this;
        }
        public PostCommentRequest build() {
            return new PostCommentRequest(this);
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
        PostCommentRequest that = (PostCommentRequest) o;
        return Objects.equals(userId, that.getUserId())
                && Objects.equals(sessionToken, that.getSessionToken())
                && Objects.equals(comment, that.getComment());
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, sessionToken, comment);
    }

}