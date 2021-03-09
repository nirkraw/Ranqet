package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.List;
import java.util.Objects;

public class FetchPresetsResponse {
    
    private final List<Preset> presets;
    
    private FetchPresetsResponse(Builder builder) {
        this.presets = builder.presets;
    }
    
    public List<Preset> getPresets() {
        return this.presets;
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    @JsonPOJOBuilder
    public static final class Builder {
        
        private List<Preset> presets;
        
        public Builder withPresets(List<Preset> presets) {
            this.presets = presets;
            return this;
        }
        public FetchPresetsResponse build() {
            return new FetchPresetsResponse(this);
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
        FetchPresetsResponse that = (FetchPresetsResponse) o;
        return Objects.equals(presets, that.getPresets());
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(presets);
    }
    
}
