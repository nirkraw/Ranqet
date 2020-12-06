package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.OptionEntity;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.SubmittedOption;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.List;
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

    public ListEntity createList(String title, String description, UUID authorId, List<SubmittedOption> options) {
        UserEntity author;
        try {
            author = usersRepository.getOne(authorId);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("Author with provided id not found");
        }

        ListEntity listEntity = new ListEntity();
        listEntity.setId(UUID.randomUUID());
        listEntity.setTitle(title);
        listEntity.setDescription(description);
        List<OptionEntity> optionEntities = options.stream()
                .map((submittedOption) -> new OptionEntity(submittedOption.getName(), listEntity, submittedOption.getImageUrl()))
                .collect(Collectors.toList());
        listEntity.setOptions(optionEntities);
        listEntity.setCreatedOn(Instant.now());
        listEntity.setCreatedBy(author);
        listsRepository.save(listEntity);

        return listEntity;
    }

}
