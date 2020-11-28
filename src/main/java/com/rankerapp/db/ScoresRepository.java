package com.rankerapp.db;

import com.rankerapp.db.model.ScoreEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ScoresRepository extends JpaRepository<ScoreEntity, UUID> {

    List<ScoreEntity> findByListIdAndUserId(UUID listId, UUID userId);

}
