package com.rankerapp.transport.model;

import java.time.Instant;

public class User {

    private final String id;

    private final String name;

    private final String avatarUrl;

    private final Instant createdOn;

    private User(Builder builder) {
        this.id = builder.id;
        this.name = builder.name;
        this.avatarUrl = builder.avatarUrl;
        this.createdOn = builder.createdOn;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String id;

        private String name;

        private String avatarUrl;

        private Instant createdOn;

        private Builder() {

        }

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder avatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public Builder createdOn(Instant createdOn) {
            this.createdOn = createdOn;
            return this;
        }

        public User build() {
            return new User(this);
        }

    }

}
