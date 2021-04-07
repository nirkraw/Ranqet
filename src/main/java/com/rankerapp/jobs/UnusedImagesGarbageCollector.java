package com.rankerapp.jobs;

import com.rankerapp.client.AwsClient;
import com.rankerapp.db.ImageListLinksRepository;
import com.rankerapp.db.ImageRecordsRepository;
import com.rankerapp.db.model.ImageRecordEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UnusedImagesGarbageCollector {
    
    private static final Logger LOG = LoggerFactory.getLogger(UnusedImagesGarbageCollector.class);
    
    // Run once every 30 mins
    private static final long INTERVAL_MS = 1800000;
    
    private static final Duration AGE_THRESHOLD = Duration.ofHours(1);
    
    private final ImageListLinksRepository imageListLinksRepo;
    
    private final ImageRecordsRepository imageRecordsRepo;
    
    private final AwsClient awsClient;
    
    @Inject
    public UnusedImagesGarbageCollector(ImageListLinksRepository imageListLinksRepo,
                                        ImageRecordsRepository imageRecordsRepo, AwsClient awsClient) {
        this.imageListLinksRepo = imageListLinksRepo;
        this.imageRecordsRepo = imageRecordsRepo;
        this.awsClient = awsClient;
    }
    
    @Scheduled(fixedDelay = INTERVAL_MS)
    public void cleanupOldUnusedImages() {
        try {
            Instant cutoffAge = Instant.now().minus(AGE_THRESHOLD);
    
            List<UUID> unusedImageIds = imageListLinksRepo.findUnusedImageIds();
            List<ImageRecordEntity> imagesToDelete = imageRecordsRepo.findAllById(unusedImageIds).stream()
                    .filter((image) -> image.getCreatedOn().isBefore(cutoffAge))
                    .collect(Collectors.toList());
    
            imagesToDelete.forEach((image) -> awsClient.deleteFileFromAWS(image.getUrl()));
    
            imageRecordsRepo.deleteAll(imagesToDelete);
            imageListLinksRepo.deleteByIds(unusedImageIds);
        } catch (Exception e) {
            LOG.error("Failed to clean up unused imageIds", e);
        }
    }
}
