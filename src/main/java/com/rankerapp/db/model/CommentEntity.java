package com.rankerapp.db.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "Comments")
public class CommentEntity {

    @Id
    private UUID id;

    @Column(name = "contents")
    private String contents;

    @Column(name = "list_id")
    private UUID listId;

    @Column(name = "posted_by")
    private UUID postedBy;

    @Column(name = "created_on")
    private Instant createdOn;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public UUID getListId() {
        return listId;
    }

    public void setListId(UUID listId) {
        this.listId = listId;
    }

    public UUID getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(UUID postedBy) {
        this.postedBy = postedBy;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

}
