package com.rankerapp.transport.model;

public class ImageUploadResponse {

    private final String imageUrl;

    private ImageUploadResponse(Builder builder) {
        this.imageUrl = builder.imageUrl;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {

        private String imageUrl;

        public Builder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public ImageUploadResponse build() {
            return new ImageUploadResponse(this);
        }

    }
}
