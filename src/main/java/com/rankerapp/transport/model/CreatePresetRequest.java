package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.List;
import java.util.Objects;

public class CreatePresetRequest {
    
    private final String title;
    
    private final List<PresetOption> presetOptions;
    
    private CreatePresetRequest(Builder builder) {
        this.title = builder.title;
        this.presetOptions = builder.presetOptions;
    }
    
    public String getTitle() {
        return this.title;
    }
    
    public List<PresetOption> getPresetOptions() {
        return this.presetOptions;
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    @JsonPOJOBuilder
    public static final class Builder {
        
        private String title;
        
        private List<PresetOption> presetOptions;
        
        public Builder withTitle(String title) {
            this.title = title;
            return this;
        }
        
        public Builder withPresetOptions(List<PresetOption> presetOptions) {
            this.presetOptions = presetOptions;
            return this;
        }
        public CreatePresetRequest build() {
            return new CreatePresetRequest(this);
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
        CreatePresetRequest that = (CreatePresetRequest) o;
        return Objects.equals(title, that.getTitle())
                && Objects.equals(presetOptions, that.getPresetOptions());
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(title, presetOptions);
    }
    
}