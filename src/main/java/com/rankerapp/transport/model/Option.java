package com.rankerapp.transport.model;

public class Option {

    private final String id;

    private final String title;

    private final String photoUrl;

    private Option(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.photoUrl = builder.photoUrl;
    }

    public String getId() {
        return id;
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

    public static class Builder {

        private String id;

        private String title;

        private String photoUrl;

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

        public Builder photoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
            return this;
        }

        public Option build() {
            return new Option(this);
        }

    }

}
