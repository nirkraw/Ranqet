package com.rankerapp.db.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "Options")
public class OptionEntity {

    @Id
    private UUID id;

    @Column(name = "option_number")
    private int optionNumber;

    @Column(name = "name")
    private String name;

    @ManyToOne(targetEntity = ListEntity.class)
    @JoinColumn(name = "list_id")
    private ListEntity list;

    @Column(name = "photoUrl")
    private String photoUrl;

    public OptionEntity() {

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

    public int getOptionNumber() {
        return optionNumber;
    }

    public void setOptionNumber(int optionNumber) {
        this.optionNumber = optionNumber;
    }

    public ListEntity getList() {
        return list;
    }

    public void setList(ListEntity list) {
        this.list = list;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public OptionEntity(String name, ListEntity list, String photoUrl) {
        this.id = UUID.randomUUID();
        this.name = name;
        this.list = list;
        this.photoUrl = photoUrl;
    }
}
