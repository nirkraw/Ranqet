package com.rankerapp.transport.model;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
@JsonDeserialize(builder = TogglePrivacyRequest.Builder.class)
public class TogglePrivacyRequest {

    private final String userId;

    private TogglePrivacyRequest(Builder builder) {
        this.userId = builder.userId;
    }

    public String getUserId() {
        return userId;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String userId;

        public Builder withUserId(String userId) {
            this.userId = userId;
            return this;
        }

        public TogglePrivacyRequest build() {
            return new TogglePrivacyRequest(this);
        }

    }
}
