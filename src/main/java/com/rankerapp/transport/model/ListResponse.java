package com.rankerapp.transport.model;

import java.time.Instant;
import java.util.List;

public class ListResponse {

    private final String id;

    private final String title;

    private final String description;

    private final int numCompletions;

    private final Instant createdOn;

    private final List<Option> options;

    private final User createdBy;

    private final String imageUrl;

    private final ListCategory category;

    private final boolean isUnlisted;
    
    // Whether this list was completed by the userId provided Otherwise default to false.
    private final boolean isCompleted;

    private ListResponse(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.description = builder.description;
        this.numCompletions = builder.numCompletions;
        this.createdOn = builder.createdOn;
        this.options = builder.options;
        this.createdBy = builder.createdBy;
        this.imageUrl = builder.imageUrl;
        this.isUnlisted = builder.isUnlisted;
        this.category = builder.category;
        this.isCompleted = builder.isCompleted;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getNumCompletions() {
        return numCompletions;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public List<Option> getOptions() {
        return options;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public boolean getIsUnlisted() {
        return isUnlisted;
    }

    public ListCategory getCategory() {
        return category;
    }
    
    public boolean getIsCompleted() {
        return isCompleted;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {

        private String id;

        private String title;

        private String description;

        private int numCompletions;

        private Instant createdOn;

        private List<Option> options;

        private User createdBy;

        private String imageUrl;

        private boolean isUnlisted;

        private ListCategory category;
        
        private boolean isCompleted;

        private Builder() {

        }

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder numCompletions(int numCompletions) {
            this.numCompletions = numCompletions;
            return this;
        }

        public Builder createdOn(Instant createdOn) {
            this.createdOn = createdOn;
            return this;
        }

        public Builder options(List<Option> options) {
            this.options = options;
            return this;
        }

        public Builder createdBy(User createdBy) {
            this.createdBy = createdBy;
            return this;
        }

        public Builder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public Builder isUnlisted(boolean isUnlisted) {
            this.isUnlisted = isUnlisted;
            return this;
        }

        public Builder category(ListCategory category) {
            this.category = category;
            return this;
        }
        
        public Builder isCompleted(boolean isCompleted) {
            this.isCompleted = isCompleted;
            return this;
        }

        public ListResponse build() {
            return new ListResponse(this);
        }

    }


}
