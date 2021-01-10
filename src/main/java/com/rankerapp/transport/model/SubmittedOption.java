package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder =  SubmittedOption.Builder.class)
public class SubmittedOption {

    public final String name;

    public final String photoUrl;

    private SubmittedOption(Builder builder) {
        this.name = builder.name;
        this.photoUrl = builder.photoUrl;
    }

    public String getName() {
        return name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }


    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        public String name;

        public String photoUrl;

        public Builder withName(String name) {
            this.name = name;
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
