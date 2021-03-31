package com.rankerapp.transport.model;

import java.util.UUID;

public class ImageUploadResponse {
    
    private final UUID imageId;

    private final String imageUrl;

    private ImageUploadResponse(Builder builder) {
        this.imageId = builder.imageId;
        this.imageUrl = builder.imageUrl;
    }
    
    public UUID getImageId() {
        return imageId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static final class Builder {
        
        private UUID imageId;

        private String imageUrl;
        
        public Builder imageId(UUID imageId) {
            this.imageId = imageId;
            return this;
        }

        public Builder imageUrl(String imageUrl) {
            this.imageUrl = imageUrl;
            return this;
        }

        public ImageUploadResponse build() {
            return new ImageUploadResponse(this);
        }

    }
}
