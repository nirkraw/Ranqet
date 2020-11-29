package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder = CreateUserRequest.Builder.class)
public class CreateUserRequest {

    private final String name;

    private final String avatarUrl;


    private CreateUserRequest(Builder builder) {
        this.name = builder.name;
        this.avatarUrl = builder.avatarUrl;
    }

    public String getName() {
        return name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String name;

        private String avatarUrl;

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public CreateUserRequest build() {
            return new CreateUserRequest(this);
        }

    }
}
