package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.List;
import java.util.UUID;

@JsonDeserialize(builder = CreateListRequest.Builder.class)
public class CreateListRequest {

    private final String name;

    private final String description;

    private final List<SubmittedOption> options;

    private final String authorId;

    private CreateListRequest(Builder builder) {
        this.name = builder.name;
        this.description = builder.description;
        this.options = builder.options;
        this.authorId = builder.authorId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<SubmittedOption> getOptions() {
        return options;
    }

    public String getAuthorId() {
        return authorId;
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String name;

        private String description;

        private List<SubmittedOption> options;

        private String authorId;

        private Builder() {
        }

        public Builder withName(String name) {
            this.name = name;
            return this;
        }

        public Builder withDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder withOptions(List<SubmittedOption> options) {
            this.options = options;
            return this;
        }

        public Builder withAuthorId(String authorId) {
            this.authorId = authorId;
            return this;
        }

        public CreateListRequest build() {
            return new CreateListRequest(this);
        }
    }
}
