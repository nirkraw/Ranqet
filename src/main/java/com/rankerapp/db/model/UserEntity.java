package com.rankerapp.db.model;

import javax.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "Users")
public class UserEntity {

    @Id
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "avatar_url")
    private String avatarUrl;

    @Column(name = "created_on")
    private Instant createdOn;

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

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public UserEntity() {

    }

    public UserEntity(String name, String avatarUrl) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.createdOn = Instant.now();
    }
}
