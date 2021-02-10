package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public class Comment {

    private final String comment;

    private final UUID postedBy;

    private final Instant createdOn;

    private Comment(Builder builder) {
        this.comment = builder.comment;
        this.postedBy = builder.postedBy;
        this.createdOn = builder.createdOn;
    }

    public String getComment() {
        return this.comment;
    }

    public UUID getPostedBy() {
        return this.postedBy;
    }

    public Instant getCreatedOn() {
        return this.createdOn;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String comment;

        private UUID postedBy;

        private Instant createdOn;

        public Builder withComment(String comment) {
            this.comment = comment;
            return this;
        }

        public Builder withPostedBy(UUID postedBy) {
            this.postedBy = postedBy;
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
                && Objects.equals(postedBy, that.getPostedBy())
                && Objects.equals(createdOn, that.getCreatedOn());
    }

    @Override
    public int hashCode() {
        return Objects.hash(comment, postedBy, createdOn);
    }

}