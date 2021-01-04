package com.rankerapp.db.model;

import javax.persistence.*;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Entity
@Table(name = "UserLists")
public class UserListEntity {

    @Id
    private UUID id;

    @Column(name = "completion_status")
    private boolean isCompleted;

    @Column(name = "matchups")
    private String matchups;

    @Column(name = "created_on")
    private Instant createdOn;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "list_id")
    private UUID listId;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getMatchups() {
       return matchups;
    }

    public List<String> getMatchupsList() {
        if (matchups == null || matchups.isEmpty()) {
            return Collections.emptyList();
        }
        return Arrays.stream(matchups.split(",")).collect(Collectors.toList());
    }

    public void setMatchups(String matchups) {
        this.matchups = matchups;
    }

    public void setMatchupsList(List<String> matchups) {
        if (matchups.size() == 0) {
            this.matchups = null;
        } else {
            this.matchups = String.join(",", matchups);
        }
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getListId() {
        return listId;
    }

    public void setListId(UUID listId) {
        this.listId = listId;
    }



}
