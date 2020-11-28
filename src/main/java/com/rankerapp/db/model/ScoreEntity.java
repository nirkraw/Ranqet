package com.rankerapp.db.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "Scores")
public class ScoreEntity {

    @Id
    private UUID id;

    @Column(name = "list_id")
    private UUID listId;

    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "option_id")
    private OptionEntity option;

    @Column(name = "score")
    private double score;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getListId() {
        return listId;
    }

    public void setListId(UUID listId) {
        this.listId = listId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public OptionEntity getOption() {
        return option;
    }

    public void setOption(OptionEntity option) {
        this.option = option;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
