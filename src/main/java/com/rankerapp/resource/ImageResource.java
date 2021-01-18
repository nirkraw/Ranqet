package com.rankerapp.resource;

import com.rankerapp.client.AwsClient;
import com.rankerapp.transport.model.ImageUploadResponse;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

@RestController
public class ImageResource {

    private final AwsClient awsClient;

    @Inject
    public ImageResource(AwsClient awsClient) {
        this.awsClient = awsClient;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/images/upload")
    public ImageUploadResponse uploadImage(@RequestPart("file") MultipartFile multipartFile) {
        String imageUrl = "";
        try {
            File file = convertMultiPartToFile(multipartFile);
            imageUrl = awsClient.uploadFileToAWS(imageUrl, file);
            file.delete();
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong while uploading image", e);
        }
        return ImageUploadResponse.builder()
                .imageUrl(imageUrl)
                .build();
    }

    // TODO: DELETE ENDPOINT

    // TODO: Add db layer to this to keep track of imageIds and urls so we can delete them easier

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



}
