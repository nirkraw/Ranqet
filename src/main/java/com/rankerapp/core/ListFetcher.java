package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.OptionEntity;
import com.rankerapp.transport.model.ListResponse;
import com.rankerapp.transport.model.Option;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ListFetcher {

    private final ListsRepository listsRepo;

    @Inject
    public ListFetcher(ListsRepository listsRepo) {
        this.listsRepo = listsRepo;
    }

    public ListResponse fetchListById(UUID id) {
        ListEntity listEntity = listsRepo.getOne(id);

        List<Option> options = listEntity.getOptions().stream()
                .map(ListFetcher::convertOption)
                .collect(Collectors.toList());

        return ListResponse.builder()
                .id(listEntity.getId().toString())
                .createdOn(listEntity.getCreatedOn())
                .description(listEntity.getDescription())
                .numCompletions(listEntity.getNumCompletions())
                .title(listEntity.getTitle())
                .options(options)
                .build();
    }

    private static Option convertOption(OptionEntity option) {
        return Option.builder()
                .id(option.getId().toString())
                .name(option.getName())
                .photoUrl(option.getPhotoUrl())
                .build();
    }


}
