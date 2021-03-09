package com.rankerapp.db.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "PresetOptions")
public class PresetOptionEntity {
    
    @Id
    private UUID id;
    
    @Column(name = "name")
    private String name;
    
    @ManyToOne(targetEntity = PresetEntity.class)
    @JoinColumn(name = "preset_id")
    private PresetEntity  preset;
    
    @Column(name = "photo_url")
    private String photoUrl;
    
    public PresetOptionEntity() {
    }
    
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public PresetEntity getPreset() {
        return preset;
    }
    
    public void setPreset(PresetEntity preset) {
        this.preset = preset;
    }
    
    public String getPhotoUrl() {
        return photoUrl;
    }
    
    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
    
}
