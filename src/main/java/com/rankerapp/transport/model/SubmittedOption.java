package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder =  SubmittedOption.Builder.class)
public class SubmittedOption {

    public final String title;

    public final String photoUrl;

    private SubmittedOption(Builder builder) {
        this.title = builder.title;
        this.photoUrl = builder.photoUrl;
    }

    public String getTitle() {
        return title;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }


    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        public String title;

        public String photoUrl;

        public Builder withTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder withPhotoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
            return this;
        }

        public SubmittedOption build() {
            return new SubmittedOption(this);
        }
    }
}
