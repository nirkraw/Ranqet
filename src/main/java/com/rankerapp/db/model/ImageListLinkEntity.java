package com.rankerapp.db.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "ImageListLinks")
public class ImageListLinkEntity {
    
    @Id
    private UUID id;
    
    @Column(name = "image_id")
    private UUID imageId;
    
    @Column(name = "list_id")
    private UUID listId;
    
    @Column(name = "created_on")
    private Instant createdOn;
    
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public UUID getImageId() {
        return imageId;
    }
    
    public void setImageId(UUID imageId) {
        this.imageId = imageId;
    }
    
    public UUID getListId() {
        return listId;
    }
    
    public void setListId(UUID listId) {
        this.listId = listId;
    }
    
    public Instant getCreatedOn() {
        return createdOn;
    }
    
    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }
    
}
