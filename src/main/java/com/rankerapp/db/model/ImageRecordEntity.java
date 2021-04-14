package com.rankerapp.db.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "imagerecords")
public class ImageRecordEntity {
    
    @Id
    private UUID id;

    @Column(name = "filename")
    private String filename;
    
    @Column(name = "url")
    private String url;
    
    @Column(name = "created_on")
    private Instant createdOn;
    
    
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getFilename() {
        return filename;
    }
    
    public void setFilename(String filename) {
        this.filename = filename;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public Instant getCreatedOn() {
        return createdOn;
    }
    
    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }
    
}
