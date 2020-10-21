package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder = CastVoteRequest.Builder.class)
public class CastVoteRequest {

    private final String userId;

    private final String winningOptionId;


    private final String losingOptionId;

    private CastVoteRequest(Builder builder) {
        this.userId = builder.userId;
        this.winningOptionId = builder.winningOptionId;
        this.losingOptionId = builder.losingOptionId;
    }

    public String getUserId() {
        return userId;
    }

    public String getWinningOptionId() {
        return winningOptionId;
    }

    public String getLosingOptionId() {
        return losingOptionId;
    }


    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String userId;

        private String winningOptionId;


        private String losingOptionId;

        public Builder withUserId(String userId) {
            this.userId = userId;
            return this;
        }

        public Builder withWinningOptionId(String winningOptionId) {
            this.winningOptionId = winningOptionId;
            return this;
        }

        public Builder withLosingOptionId(String losingOptionId) {
            this.losingOptionId = losingOptionId;
            return this;
        }

        public CastVoteRequest build() {
            return new CastVoteRequest(this);
        }

    }

}
