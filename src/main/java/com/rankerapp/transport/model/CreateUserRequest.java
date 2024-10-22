package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder = CreateUserRequest.Builder.class)
public class CreateUserRequest {

    private final String name;

    private final String username;

    private final String avatarUrl;

    private final String password;

    private CreateUserRequest(Builder builder) {
        this.name = builder.name;
        this.username = builder.username;
        this.avatarUrl = builder.avatarUrl;
        this.password = builder.password;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public String getPassword() {
        return password;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String name;

        private String username;

        private String avatarUrl;

        private String password;

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withUsername(String username) {
            this.username = username;
            return this;
        }

        public Builder withAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public Builder withPassword(String password) {
            this.password = password;
            return this;
        }

        public CreateUserRequest build() {
            return new CreateUserRequest(this);
        }

    }
}
