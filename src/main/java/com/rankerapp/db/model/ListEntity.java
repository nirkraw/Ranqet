package com.rankerapp.db.model;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Lists")
public class ListEntity {

    @Id
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "num_completions")
    private int numCompletions;

    @Column(name = "created_on")
    private Instant createdOn;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "category")
    @Enumerated(EnumType.STRING)
    private ListCategory category;

    @OneToMany(targetEntity = OptionEntity.class, mappedBy = "list", cascade = CascadeType.ALL)
    private List<OptionEntity> options;

    @ManyToOne(targetEntity = UserEntity.class)
    @JoinColumn(name = "created_by", referencedColumnName = "id")
    private UserEntity createdBy;

    @Column(name = "is_private")
    private boolean isPrivate;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNumCompletions() {
        return numCompletions;
    }

    public void setNumCompletions(int numCompletions) {
        this.numCompletions = numCompletions;
    }

    public Instant getCreatedOn() {
        return createdOn;
    }

    public void setCreatedOn(Instant createdOn) {
        this.createdOn = createdOn;
    }

    public List<OptionEntity> getOptions() {
        return options;
    }

    public void setOptions(List<OptionEntity> options) {
        this.options = options;
    }

    public UserEntity getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserEntity createdBy) {
        this.createdBy = createdBy;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public ListCategory getCategory() {
        return category;
    }

    public void setCategory(ListCategory category) {
        this.category = category;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

}
