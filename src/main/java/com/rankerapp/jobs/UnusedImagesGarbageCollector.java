package com.rankerapp.jobs;

import com.rankerapp.client.AwsClient;
import com.rankerapp.db.ImageRecordsRepository;
import com.rankerapp.db.model.ImageRecordEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UnusedImagesGarbageCollector {
    
    // Run once every 10 minutes
    private static final long INTERVAL_MS = 600000;
    
    private static final Duration AGE_THRESHOLD = Duration.ofHours(1);
    
    private final ImageRecordsRepository imageRecordsRepo;
    
    private final AwsClient awsClient;
    
    @Inject
    public UnusedImagesGarbageCollector(ImageRecordsRepository imageRecordsRepo, AwsClient awsClient) {
        this.imageRecordsRepo = imageRecordsRepo;
        this.awsClient = awsClient;
    }
    
    @Scheduled(fixedDelay = INTERVAL_MS)
    public void cleanupOldUnusedImages() {
        Instant cutoffAge = Instant.now().minus(AGE_THRESHOLD);
        List<ImageRecordEntity> imagesToDelete = imageRecordsRepo.findUnassociatedImagesOlderThan(cutoffAge)
                .collect(Collectors.toList());
        imagesToDelete.forEach((image) -> awsClient.deleteFileFromAWS(image.getUrl()));
        imageRecordsRepo.deleteAll(imagesToDelete);
    }
}
