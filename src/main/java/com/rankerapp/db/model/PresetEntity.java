package com.rankerapp.db.model;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Presets")
public class PresetEntity {
    
    @Id
    private UUID id;
    
    @Column(name = "title")
    private String title;
    
    @Column(name = "created_by")
    private UUID createdBy;
    
    @Column(name = "created_on")
    private Instant createdOn;
    
    @OneToMany(targetEntity = PresetOptionEntity.class, mappedBy = "preset", cascade = CascadeType.ALL)
    private List<PresetOptionEntity> presetOptions;
    
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public UUID getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(UUID createdBy) {
        this.createdBy = createdBy;
    }
    
    public Instant getCreatedOn() {
        return createdOn;
    }
    
    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }
    
    public List<PresetOptionEntity> getPresetOptions() {
        return presetOptions;
    }
    
    public void setPresetOptions(List<PresetOptionEntity> presetOptions) {
        this.presetOptions = presetOptions;
    }
    
}
