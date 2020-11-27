package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.OptionEntity;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ListWriter {

    private final ListsRepository listsRepository;

    @Inject
    public ListWriter(ListsRepository listsRepository) {
        this.listsRepository = listsRepository;
    }

    public ListEntity writeList(String title, String description, List<String> options) {
        ListEntity listEntity = new ListEntity();
        listEntity.setId(UUID.randomUUID());
        listEntity.setTitle(title);
        listEntity.setDescription(description);
        List<OptionEntity> optionEntities = options.stream()
                .map((optionName) -> new OptionEntity(optionName, listEntity, null))
                .collect(Collectors.toList());
        listEntity.setOptions(optionEntities);
        listEntity.setCreatedOn(Instant.now());
        listsRepository.save(listEntity);

        return listEntity;
    }

}
