package com.rankerapp.transport.model;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

public class Preset {
    
    private final UUID id;
    
    private final String title;
    
    private final UUID createdBy;
    
    private final List<PresetOption> presetOptions;
    
    private Preset(Builder builder) {
        this.id = builder.id;
        this.title = builder.title;
        this.createdBy = builder.createdBy;
        this.presetOptions = builder.presetOptions;
    }
    
    public UUID getId() {
        return this.id;
    }
    
    public String getTitle() {
        return this.title;
    }
    
    public UUID getCreatedBy() {
        return this.createdBy;
    }
    
    public List<PresetOption> getPresetOptions() {
        return this.presetOptions;
    }
    
    public static Builder builder() {
        return new Builder();
    }
    
    @JsonPOJOBuilder
    public static final class Builder {
        
        private UUID id;
        
        private String title;
        
        private UUID createdBy;
        
        private List<PresetOption> presetOptions;
        
        public Builder withId(UUID id) {
            this.id = id;
            return this;
        }
        
        public Builder withTitle(String title) {
            this.title = title;
            return this;
        }
        
        public Builder withCreatedBy(UUID createdBy) {
            this.createdBy = createdBy;
            return this;
        }
        
        public Builder withPresetOptions(List<PresetOption> presetOptions) {
            this.presetOptions = presetOptions;
            return this;
        }
        public Preset build() {
            return new Preset(this);
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
        Preset that = (Preset) o;
        return Objects.equals(id, that.getId())
                && Objects.equals(title, that.getTitle())
                && Objects.equals(createdBy, that.getCreatedBy())
                && Objects.equals(presetOptions, that.getPresetOptions());
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(id, title, createdBy, presetOptions);
    }
    
}
