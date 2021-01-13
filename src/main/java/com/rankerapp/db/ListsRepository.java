package com.rankerapp.db;

import com.rankerapp.db.model.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ListsRepository extends JpaRepository<ListEntity, UUID> {

    List<ListEntity> findByCreatedBy(UUID createdBy);

}
