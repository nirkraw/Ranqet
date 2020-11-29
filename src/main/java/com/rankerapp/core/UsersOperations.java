package com.rankerapp.core;

import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.User;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import java.util.UUID;

@Component
public class UsersOperations {

    private final UsersRepository usersRepo;

    @Inject
    public UsersOperations(UsersRepository usersRepo) {
        this.usersRepo = usersRepo;
    }

    public User getUser(UUID id) {
        try {
            return convertUserEntity(usersRepo.getOne(id));
        } catch (EntityNotFoundException e) {
            throw new NotFoundException(String.format("User with id %s not found!", id));
        }
    }

    public User createUser(String name, String avatarUrl) {
        UserEntity userEntity = new UserEntity(name, avatarUrl);
        usersRepo.save(userEntity);

        return convertUserEntity(userEntity);
    }

    private User convertUserEntity(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId().toString())
                .name(userEntity.getName())
                .avatarUrl(userEntity.getAvatarUrl())
                .createdOn(userEntity.getCreatedOn())
                .build();
    }
}
