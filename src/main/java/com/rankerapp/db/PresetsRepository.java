package com.rankerapp.db;

import com.rankerapp.db.model.PresetEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PresetsRepository extends JpaRepository<PresetEntity, UUID> {
    
    List<PresetEntity> findByCreatedBy(UUID createdBy);
}
