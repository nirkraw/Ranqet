package com.rankerapp.core;

import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.UserEntity;
import com.rankerapp.exceptions.ForbiddenException;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.User;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.persistence.EntityNotFoundException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
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

    public User login(String username, String password) {
        UserEntity user = usersRepo.findByUsername(username)
                .orElseThrow(() -> new ForbiddenException("Username " + username + " not found!"));
        if (hashPassword(password, user.getPasswordSalt()).equals(user.getPasswordHash())) {
            return convertUserEntity(user);
        } else {
            throw new ForbiddenException("Incorrect username and password for user: " + username);
        }
    }

    public User createUser(String name, String avatarUrl, String username, String password) {
        UserEntity userEntity = new UserEntity(name, avatarUrl);
        String passwordSalt = UUID.randomUUID().toString();
        String passwordHash = hashPassword(password, passwordSalt);

        userEntity.setPasswordHash(passwordHash);
        userEntity.setPasswordSalt(passwordSalt);
        userEntity.setUsername(username);
        usersRepo.save(userEntity);

        return convertUserEntity(userEntity);
    }

    private String hashPassword(String password, String salt) {
        try {
            byte[] hash = MessageDigest.getInstance("MD5").digest((salt + password).getBytes());
            return new String(hash, StandardCharsets.UTF_8);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("No such algorithm exception thrown", e);
        }
    }

    static User convertUserEntity(UserEntity userEntity) {
        return User.builder()
                .id(userEntity.getId().toString())
                .name(userEntity.getName())
                .username(userEntity.getUsername())
                .avatarUrl(userEntity.getAvatarUrl())
                .createdOn(userEntity.getCreatedOn())
                .build();
    }
}
