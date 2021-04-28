package com.rankerapp.db.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "Events")
public class EventEntity {
    
    @Id
    private UUID id;
    
    @Column(name = "type")
    private EventType type;
    
    @Column(name = "list_id")
    private UUID listId;
    
    @Column(name = "occurred_on")
    private Instant occurredOn;
    
    public UUID getId() {
        return id;
    }
    
    public EventType getType() {
        return type;
    }
    
    public UUID getListId() {
        return listId;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public void setType(EventType type) {
        this.type = type;
    }
    
    public void setListId(UUID listId) {
        this.listId = listId;
    }
    
    public Instant getOccurredOn() {
        return occurredOn;
    }
    
    public void setOccurredOn(Instant occurredOn) {
        this.occurredOn = occurredOn;
    }
}
