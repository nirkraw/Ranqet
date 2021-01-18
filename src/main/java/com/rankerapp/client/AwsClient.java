package com.rankerapp.client;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.Objects;

@Service
public class AwsClient {

    private AmazonS3 s3Client;

    @Value("${awsProperties.endpointUrl}")
    private String endpointUrl;
    @Value("${awsProperties.bucketName}")
    private String bucketName;
    @Value("${awsProperties.accessKey}")
    private String accessKey;
    @Value("${awsProperties.secretKey}")
    private String secretKey;

    @PostConstruct
    private void initializeAmazonS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(this.accessKey, this.secretKey);
        s3Client = new AmazonS3Client(credentials);
    }

    public String uploadFileToAWS(String fileName, File file) {
        System.out.println("\n\n\n filename: " + fileName + " with isFilePresent: " + Objects.isNull(file));
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, file)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return endpointUrl + "/" + bucketName + "/" + fileName;
    }

    public String deleteFileFromAWS(String fileUrl) {
        String fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        s3Client.deleteObject(new DeleteObjectRequest(bucketName + "/", fileName));
        return "Successfully deleted";
    }
}
