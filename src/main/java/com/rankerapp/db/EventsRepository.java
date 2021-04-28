package com.rankerapp.db;

import com.rankerapp.db.model.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface EventsRepository extends JpaRepository<EventEntity, UUID> {
    
    @Query("SELECT COUNT(*) FROM EventEntity event WHERE event.listId = :listId")
    long countByListId(UUID listId);
    
}
