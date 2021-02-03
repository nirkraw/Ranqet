package com.rankerapp.core;

import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.ScoresRepository;
import com.rankerapp.db.UserListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.ListEntity;
import com.rankerapp.db.model.ScoreEntity;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.exceptions.BadRequestException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;
import java.util.UUID;

@Component
public class ListDeleter {

    private final ListsRepository listsRepository;

    private final UsersRepository usersRepository;

    private final ScoresRepository scoresRepository;

    private final UserListsRepository userListsRepository;

    @Inject
    public ListDeleter(ListsRepository listsRepository, UsersRepository usersRepository,
                       UserListsRepository userListsRepository, ScoresRepository scoresRepository) {
        this.listsRepository = listsRepository;
        this.usersRepository = usersRepository;
        this.userListsRepository = userListsRepository;
        this.scoresRepository = scoresRepository;
    }

    @Transactional
    public void deleteList(UUID listId, UUID userId, String sessionToken) {
        UserEntity userEntity = usersRepository.getOne(userId);

        if (!userEntity.getSessionToken().equals(sessionToken)) {
            throw new BadRequestException("Invalid session token! Please log in again");
        }

        scoresRepository.deleteByListId(listId);
        userListsRepository.deleteByListId(listId);
        ListEntity listToDelete = listsRepository.getOne(listId);
        listsRepository.delete(listToDelete);
    }


}
