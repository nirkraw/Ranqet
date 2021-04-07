package com.rankerapp.db;

import com.rankerapp.db.model.ImageRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ImageRecordsRepository extends JpaRepository<ImageRecordEntity, UUID> {
    
}
