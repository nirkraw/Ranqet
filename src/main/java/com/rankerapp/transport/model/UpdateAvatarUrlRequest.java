package com.rankerapp.transport.model;


import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
@JsonDeserialize(builder = UpdateAvatarUrlRequest.Builder.class)
public class UpdateAvatarUrlRequest {

    private final String avatarUrl;

    private UpdateAvatarUrlRequest(Builder builder) {
        this.avatarUrl = builder.avatarUrl;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String avatarUrl;

        public Builder withAvatarUrl(String avatarUrl) {
            this.avatarUrl = avatarUrl;
            return this;
        }

        public UpdateAvatarUrlRequest build() {
            return new UpdateAvatarUrlRequest(this);
        }

    }
}
