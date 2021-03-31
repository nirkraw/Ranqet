package com.rankerapp.resource;

import com.rankerapp.client.AwsClient;
import com.rankerapp.db.ImageRecordsRepository;
import com.rankerapp.db.model.ImageRecordEntity;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.ImageUploadResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@RestController
public class ImageResource {

    private final AwsClient awsClient;
    
    private final ImageRecordsRepository imageRecordsRepo;

    @Inject
    public ImageResource(AwsClient awsClient, ImageRecordsRepository imageRecordsRepo) {
        this.awsClient = awsClient;
        this.imageRecordsRepo = imageRecordsRepo;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/images/upload")
    public ImageUploadResponse uploadImage(@RequestPart("file") MultipartFile multipartFile) {
        String imageUrl = "";
        ImageRecordEntity imageRecord = null;
        try {
            File file = convertMultiPartToFile(multipartFile);
            String fileName = generateFileName(multipartFile);
            imageUrl = awsClient.uploadFileToAWS(fileName, file);
            file.delete();
            
            imageRecord = buildImageRecord(fileName, imageUrl);
            imageRecordsRepo.save(imageRecord);
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong while uploading image", e);
        }
        return ImageUploadResponse.builder()
                .imageId(imageRecord.getId())
                .imageUrl(imageUrl)
                .build();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/image/{imageId}")
    public void deleteImage(@PathVariable(value = "imageId") String imageId) {
        ImageRecordEntity imageRecord = imageRecordsRepo.findById(UUID.fromString(imageId))
                .orElseThrow(() -> new NotFoundException("Request imageId not found"));
        
        awsClient.deleteFileFromAWS(imageRecord.getUrl());
        imageRecordsRepo.delete(imageRecord);
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    private ImageRecordEntity buildImageRecord(String filename, String url) {
        ImageRecordEntity imageRecordEntity = new ImageRecordEntity();
        imageRecordEntity.setId(UUID.randomUUID());
        imageRecordEntity.setAssociatedListId(null);
        imageRecordEntity.setCreatedOn(Instant.now());
        imageRecordEntity.setUrl(url);
        imageRecordEntity.setFilename(filename);
        return imageRecordEntity;
    }


}
