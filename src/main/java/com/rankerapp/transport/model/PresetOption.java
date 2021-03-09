package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.Objects;

public class PresetOption {
    
    private final String name;
    
    private final String photoUrl;
    
    public PresetOption(String name, String photoUrl) {
        this.name = name;
        this.photoUrl = photoUrl;
    }
    
    private PresetOption(Builder builder) {
        this.name = builder.name;
        this.photoUrl = builder.photoUrl;
    }
    
    public String getName() {
        return this.name;
    }
    
    public String getPhotoUrl() {
        return this.photoUrl;
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    @JsonPOJOBuilder
    public static final class Builder {
        
        private String name;
        
        private String photoUrl;
        
        public Builder withName(String name) {
            this.name = name;
            return this;
        }
        
        public Builder withPhotoUrl(String photoUrl) {
            this.photoUrl = photoUrl;
            return this;
        }
        public PresetOption build() {
            return new PresetOption(this);
        }
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        PresetOption that = (PresetOption) o;
        return Objects.equals(name, that.getName())
                && Objects.equals(photoUrl, that.getPhotoUrl());
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(name, photoUrl);
    }
    
}
