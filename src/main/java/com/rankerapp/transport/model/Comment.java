package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public class Comment {

    private final String commentId;

    private final String comment;

    private final UUID authorId;

    private final String authorName;

    private final String authorAvatarUrl;

    private final Instant createdOn;

    private Comment(Builder builder) {
        this.commentId = builder.commentId;
        this.comment = builder.comment;
        this.authorId = builder.postedBy;
        this.authorName = builder.authorName;
        this.authorAvatarUrl = builder.authorAvatarUrl;
        this.createdOn = builder.createdOn;
    }

    public String getCommentId() {
        return this.commentId;
    }

    public String getComment() {
        return this.comment;
    }

    public UUID getAuthorId() {
        return this.authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public String getAuthorAvatarUrl() {
        return authorAvatarUrl;
    }

    public Instant getCreatedOn() {
        return this.createdOn;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String commentId;

        private String comment;

        private UUID postedBy;

        private String authorName;

        private String authorAvatarUrl;

        private Instant createdOn;

        public Builder withCommentId(String commentId) {
            this.commentId = commentId;
            return this;
        }

        public Builder withComment(String comment) {
            this.comment = comment;
            return this;
        }

        public Builder withPostedBy(UUID postedBy) {
            this.postedBy = postedBy;
            return this;
        }

        public Builder withAuthorName(String authorName) {
            this.authorName = authorName;
            return this;
        }

        public Builder withAuthorAvatarUrl(String authorAvatarUrl) {
            this.authorAvatarUrl = authorAvatarUrl;
            return this;
        }

        public Builder withCreatedOn(Instant createdOn) {
            this.createdOn = createdOn;
            return this;
        }
        public Comment build() {
            return new Comment(this);
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
        Comment that = (Comment) o;
        return Objects.equals(comment, that.getComment())
                && Objects.equals(authorId, that.getAuthorId())
                && Objects.equals(createdOn, that.getCreatedOn())
                && Objects.equals(authorName, that.getAuthorName())
                && Objects.equals(authorAvatarUrl, that.getAuthorAvatarUrl())
                && Objects.equals(commentId, that.getCommentId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, comment, authorId, authorName, authorAvatarUrl, createdOn);
    }

}