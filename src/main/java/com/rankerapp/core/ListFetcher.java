package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.OptionEntity;
import com.rankerapp.db.model.ScoreEntity;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.transport.model.ListResponse;
import com.rankerapp.transport.model.Option;
import com.rankerapp.transport.model.RankingResponse;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class ListFetcher {

    private final ListsRepository listsRepo;

    private final ScoresRepository scoresRepository;

    private final UsersRepository usersRepo;

    @Inject
    public ListFetcher(ListsRepository listsRepo, ScoresRepository scoresRepository, UsersRepository usersRepo) {
        this.listsRepo = listsRepo;
        this.scoresRepository = scoresRepository;
        this.usersRepo = usersRepo;
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
                .createdBy(UsersOperations.convertUserEntity(listEntity.getCreatedBy()))
                .build();
    }

    public RankingResponse fetchRankings(UUID listId, UUID userId) {
        List<ScoreEntity> scores = scoresRepository.findByListIdAndUserId(listId, userId);
        ListEntity list = listsRepo.getOne(listId);
        UserEntity user = usersRepo.getOne(userId);

        List<Option> rankedOptions = scores.stream()
                .sorted((first, second) -> Double.compare(first.getScore(), second.getScore() * -1))
                .map(ScoreEntity::getOption)
                .map(ListFetcher::convertOption)
                .collect(Collectors.toList());

        return RankingResponse.builder()
                .title(list.getTitle())
                .description(list.getDescription())
                .options(rankedOptions)
                .completedBy(UsersOperations.convertUserEntity(user))
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
