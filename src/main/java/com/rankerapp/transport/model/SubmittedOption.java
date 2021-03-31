package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

@JsonDeserialize(builder =  SubmittedOption.Builder.class)
public class SubmittedOption {

    public final String name;
    
    public final String imageId;

    public final String imageUrl;

    private SubmittedOption(Builder builder) {
        this.name = builder.name;
        this.imageId = builder.imageId;
        this.imageUrl = builder.imageUrl;
    }

    public String getName() {
        return name;
    }
    
    public String getImageId() {
        return imageId;
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
        
        public String imageId;

        public String imageUrl;

        public Builder withName(String name) {
            this.name = name;
            return this;
        }
        
        public Builder withImageId(String imageId) {
            this.imageId = imageId;
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
