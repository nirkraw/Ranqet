package com.rankerapp.db;

import com.rankerapp.db.model.ImageListLinkEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ImageListLinksRepository extends JpaRepository<ImageListLinkEntity, UUID> {

    List<ImageListLinkEntity> findByImageId(UUID imageId);
    
    List<ImageListLinkEntity> findByListId(UUID listId);
    
    @Query("SELECT imagelink.imageId FROM ImageListLinkEntity imagelink GROUP BY imagelink.imageId "
            + "HAVING COUNT(CASE WHEN imagelink.listId IS NOT NULL THEN 1 END) = 0")
    List<UUID> findUnusedImageIds();
    
    @Query("DELETE FROM ImageListLinkEntity imagelink where imagelink.id in ?1")
    void deleteByIds(List<UUID> ids);

}
