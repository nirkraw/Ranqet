package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import org.apache.commons.lang3.StringUtils;

import java.util.List;
import java.util.Optional;

@JsonDeserialize(builder = CreateListRequest.Builder.class)
public class CreateListRequest {

    private final String title;

    private final String description;

    private final List<SubmittedOption> options;

    private final String authorId;

    private final String imageUrl;

    private final ListCategory category;

    private final boolean isUnlisted;
    
    private final String presetTitle;

    private CreateListRequest(Builder builder) {
        this.title = builder.title;
        this.description = builder.description;
        this.options = builder.options;
        this.authorId = builder.authorId;
        this.imageUrl = builder.imageUrl;
        this.category = builder.category;
        this.isUnlisted = builder.isUnlisted;
        this.presetTitle = builder.presetTitle;
    }

    public String getTitle() {
        return title;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public ListCategory getCategory() {
        return category;
    }

    public boolean isUnlisted() {
        return isUnlisted;
    }
    
    public Optional<String> getPresetTitle() {
        return Optional.ofNullable(presetTitle);
    }

    public static Builder builder() {
        return new Builder();
    }

    @JsonPOJOBuilder
    public static final class Builder {

        private String title;

        private String description;

        private List<SubmittedOption> options;

        private String authorId;

        private String imageUrl;

        private ListCategory category;

        private boolean isUnlisted;
        
        private String presetTitle;

        private Builder() {
        }

        public Builder withTitle(String title) {
            this.title = title;
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

        public Builder withImageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public Builder withCategory(ListCategory category) {
            this.category = category;
            return this;
        }

        public Builder withIsUnlisted(boolean isUnlisted) {
            this.isUnlisted = isUnlisted;
            return this;
        }
        
        public Builder withPresetTitle(String presetTitle) {
            this.presetTitle = StringUtils.trimToNull(presetTitle);
            return this;
        }

        public CreateListRequest build() {
            return new CreateListRequest(this);
        }
    }
}
