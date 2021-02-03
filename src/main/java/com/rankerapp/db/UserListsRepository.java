package com.rankerapp.db;

import com.rankerapp.db.model.UserListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserListsRepository extends JpaRepository<UserListEntity, UUID> {

    Optional<UserListEntity> findByUserIdAndListId(UUID userId, UUID listId);

    List<UserListEntity> findByUserId(UUID userId);

    Long deleteByUserIdAndListId(UUID userId, UUID listId);
}
