package com.rankerapp.core;

import com.rankerapp.db.ImageListLinksRepository;
import com.rankerapp.db.ImageRecordsRepository;
import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.*;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.exceptions.ForbiddenException;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.ListCategory;
import com.rankerapp.transport.model.SubmittedOption;
import org.apache.commons.lang3.ObjectUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ListWriter {
    
    private static final Logger LOG = LoggerFactory.getLogger(ListWriter.class);

    private final ListsRepository listsRepository;

    private final UsersRepository usersRepository;
    
    private final ImageRecordsRepository imageRecordsRepository;
    
    private final ImageListLinksRepository imageListLinksRepository;

    @Inject
    public ListWriter(ListsRepository listsRepository, UsersRepository usersRepository,
                      ImageRecordsRepository imageRecordsRepository, ImageListLinksRepository imageListLinksRepository) {
        this.listsRepository = listsRepository;
        this.usersRepository = usersRepository;
        this.imageRecordsRepository = imageRecordsRepository;
        this.imageListLinksRepository = imageListLinksRepository;
    }

    public ListEntity createList(String title, String description, UUID authorId, List<SubmittedOption> options,
                                 UUID imageId, String imageUrl, ListCategory category, boolean isPrivate) {
        validateCategory(category);
        validateOptions(options);
        
        // build and write list to db
        UserEntity author = Optional.ofNullable(authorId)
                .map(this::findAuthorById)
                .orElseThrow(() -> new BadRequestException("Author ID required to create list!"));
        com.rankerapp.db.model.ListCategory categoryDBEnum = com.rankerapp.db.model.ListCategory.valueOf(category.name());
        ListEntity listEntity = buildListEntity(title, description, options, author, categoryDBEnum, imageUrl, isPrivate);
        listsRepository.save(listEntity);
        
        // link images used in this list with the newly created listId
        List<UUID> imageIdsToLink = options.stream()
                .filter((option) -> !StringUtils.isEmpty(option.getImageId()))
                .map((option) -> UUID.fromString(option.getImageId()))
                .collect(Collectors.toList());
        
        // link title image
        if (imageId != null) {
            imageIdsToLink.add(imageId);
        }
        
        linkImagesWithListId(listEntity.getId(), imageIdsToLink);

        return listEntity;
    }

    public void toggleListPrivacy(UUID listId, UUID userId) {
        ListEntity list = listsRepository.getOne(listId);

        if (!list.getCreatedBy().getId().equals(userId)) {
            throw new ForbiddenException("Only the author of the list can toggle the privacy");
        }

        list.setPrivate(!list.isPrivate());
    }
    
    // Fetch all images and create new image link records for all of them with the new list id
    // This will be used as a reference counter to determine which images can be cleaned up by async process
    private void linkImagesWithListId(UUID listId, List<UUID> imageIds) {
        List<ImageListLinkEntity> imageLinks = imageRecordsRepository.findAllById(imageIds).stream()
                .map((image) -> image.getId())
                .map((imageId) -> {
                    ImageListLinkEntity imageLink = new ImageListLinkEntity();
                    imageLink.setId(UUID.randomUUID());
                    imageLink.setImageId(imageId);
                    imageLink.setListId(listId);
                    imageLink.setCreatedOn(Instant.now());
                    return imageLink;
                })
                .collect(Collectors.toList());
        
        imageListLinksRepository.saveAll(imageLinks);
    }
    
    private void validateCategory(ListCategory category) {
        if (category == null) {
            throw new BadRequestException("List category is required!");
        } else if (category == ListCategory.NEW || category == ListCategory.POPULAR) {
            throw new BadRequestException("Invalid ListCategory: " + category);
        }
    }
    
    private void validateOptions(List<SubmittedOption> options) {
        if (options == null || options.size() < 2) {
            throw new BadRequestException("At least two options must be present to create a list");
        }
    
        Set<String> optionNames = new HashSet<>();
        for (SubmittedOption option : options) {
            if (optionNames.contains(option.getName())) {
                throw new BadRequestException("Request has duplicate option names!");
            }
            optionNames.add(option.getName());
        }
    }
    
    private UserEntity findAuthorById(UUID authorId) {
        try {
            return usersRepository.getOne(authorId);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("Author with provided id not found");
        }
    }
    
    private ListEntity buildListEntity(String title, String description, List<SubmittedOption> options, UserEntity author,
                                       com.rankerapp.db.model.ListCategory category, String imageUrl, boolean isPrivate) {
        ListEntity listEntity = new ListEntity();
        listEntity.setId(UUID.randomUUID());
        listEntity.setTitle(title);
        listEntity.setDescription(description);
        List<OptionEntity> optionEntities = options.stream()
                .map((submittedOption) -> new OptionEntity(submittedOption.getName(), listEntity, submittedOption.getImageUrl()))
                .collect(Collectors.toList());
        
        // Manually set option numbers in order they were received
        for (int i = 0; i < optionEntities.size(); i++) {
            optionEntities.get(i).setOptionNumber(i + 1);
        }
        
        listEntity.setOptions(optionEntities);
        listEntity.setCreatedOn(Instant.now());
        listEntity.setCreatedBy(author);
        listEntity.setImageUrl(imageUrl);
        listEntity.setPrivate(isPrivate);
        listEntity.setCategory(category);
        return listEntity;
    }

}
