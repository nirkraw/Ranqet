package com.rankerapp.db;

import com.rankerapp.db.model.ImageRecordEntity;
import com.rankerapp.db.model.ListEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.stream.Stream;

@Repository
public interface ImageRecordsRepository extends JpaRepository<ImageRecordEntity, UUID> {
    
    Stream<ListEntity> findByAssociatedListId(UUID associatedListId, Pageable pageable);
    
}
