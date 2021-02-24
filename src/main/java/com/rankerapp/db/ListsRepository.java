package com.rankerapp.db;

import com.rankerapp.db.model.ListCategory;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Repository
public interface ListsRepository extends JpaRepository<ListEntity, UUID> {

    List<ListEntity> findByCreatedBy(UserEntity createdBy);

    List<ListEntity> findByCreatedByAndIsPrivate(UserEntity createdBy, boolean isPrivate);

    Stream<ListEntity> findByIsPrivate(boolean isPrivate, Pageable pageable);

    Stream<ListEntity> findByCategoryAndIsPrivate(ListCategory category, boolean isPrivate, Pageable pageable);
}
