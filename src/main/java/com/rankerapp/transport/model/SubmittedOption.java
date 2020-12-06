package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder =  SubmittedOption.Builder.class)
public class SubmittedOption {

    public final String name;

    public final String imageUrl;

    private SubmittedOption(Builder builder) {
        this.name = builder.name;
        this.imageUrl = builder.imageUrl;
    }

    public String getName() {
        return name;
    }

    public String getImageUrl() {
        return imageUrl;
    }


    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        public String name;

        public String imageUrl;

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public SubmittedOption build() {
            return new SubmittedOption(this);
        }
    }
}
