package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.OptionEntity;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.exceptions.ForbiddenException;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.ListCategory;
import com.rankerapp.transport.model.SubmittedOption;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ListWriter {

    private final ListsRepository listsRepository;

    private final UsersRepository usersRepository;

    @Inject
    public ListWriter(ListsRepository listsRepository, UsersRepository usersRepository) {
        this.listsRepository = listsRepository;
        this.usersRepository = usersRepository;
    }

    public ListEntity createList(String title, String description, UUID authorId, List<SubmittedOption> options,
                                 String imageUrl, ListCategory category, boolean isPrivate) {
        if (category == null) {
            throw new BadRequestException("List category is required!");
        }

        // validate that two options don't have the same name
        Set<String> optionNames = new HashSet<>();
        for (SubmittedOption option : options) {
            if (optionNames.contains(option.getName())) {
                throw new BadRequestException("Request has duplicate option names!");
            }
            optionNames.add(option.getName());
        }

        if (authorId == null) {
            throw new BadRequestException("Author ID required to create list!");
        }

        UserEntity author;
        try {
            author = usersRepository.getOne(authorId);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("Author with provided id not found");
        }

        if (options == null || options.size() < 2) {
            throw new BadRequestException("At least two options must be present to create a list");
        }

        ListEntity listEntity = new ListEntity();
        listEntity.setId(UUID.randomUUID());
        listEntity.setTitle(title);
        listEntity.setDescription(description);
        List<OptionEntity> optionEntities = options.stream()
                .map((submittedOption) -> new OptionEntity(submittedOption.getName(), listEntity, submittedOption.getPhotoUrl()))
                .collect(Collectors.toList());
        for (int i = 0; i < optionEntities.size(); i++) {
            optionEntities.get(i).setOptionNumber(i + 1);
        }
        listEntity.setOptions(optionEntities);
        listEntity.setCreatedOn(Instant.now());
        listEntity.setCreatedBy(author);
        listEntity.setImageUrl(imageUrl);
        listEntity.setPrivate(isPrivate);
        listEntity.setCategory(com.rankerapp.db.model.ListCategory.valueOf(category.name()));
        listsRepository.save(listEntity);

        return listEntity;
    }

    public void toggleListPrivacy(UUID listId, UUID userId) {
        ListEntity list = listsRepository.getOne(listId);

        if (!list.getCreatedBy().getId().equals(userId)) {
            throw new ForbiddenException("Only the author of the list can toggle the privacy");
        }

        list.setPrivate(!list.isPrivate());
    }

}
