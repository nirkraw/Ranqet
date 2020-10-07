package com.rankerapp.db.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "Options")
public class OptionEntity {
    @Id
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "list_id")
    private UUID listId;

    @Column(name = "photoUrl")
    private String photoUrl;

    public OptionEntity() {

    }

    public OptionEntity(UUID id, String name, UUID listId, String photoUrl) {
        this.id = id;
        this.name = name;
        this.listId = listId;
        this.photoUrl = photoUrl;
    }
}
