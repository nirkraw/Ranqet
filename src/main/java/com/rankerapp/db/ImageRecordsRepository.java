package com.rankerapp.db;

import com.rankerapp.db.model.ImageRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;
import java.util.stream.Stream;

@Repository
public interface ImageRecordsRepository extends JpaRepository<ImageRecordEntity, UUID> {
    
    @Query("SELECT imagerecord FROM ImageRecordEntity imagerecord WHERE imagerecord.associatedListId IS NULL AND "
            + "imagerecord.createdOn < :ageCutoff")
    Stream<ImageRecordEntity> findUnassociatedImagesOlderThan(Instant ageCutoff);
    
}
