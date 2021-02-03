package com.rankerapp.resource;

import com.rankerapp.core.UsersOperations;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.transport.model.CreateUserRequest;
import com.rankerapp.transport.model.LoginRequest;
import com.rankerapp.transport.model.UpdateAvatarUrlRequest;
import com.rankerapp.transport.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.UUID;

@RestController
public class UsersResource {

    private final UsersOperations usersOperations;

    @Inject
    public UsersResource(UsersOperations usersOperations) {
        this.usersOperations = usersOperations;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user/login")
    public User login(@RequestBody LoginRequest request) {
        return usersOperations.login(request.getUsername(), request.getPassword());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable(value = "userId") String userId) {
        return usersOperations.getUser(UUID.fromString(userId));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/user/{userId}/avatarUrl")
    public User updateAvatarUrl(@PathVariable(value = "userId") String userId, @RequestBody UpdateAvatarUrlRequest request) {
        if (request == null || StringUtils.isEmpty(request.getAvatarUrl())) {
            throw new BadRequestException("Avatar Url cannot be blank");
        }

        return usersOperations.updateAvatarUrl(UUID.fromString(userId), request.getAvatarUrl());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user/create")
    public User createUser(@RequestBody CreateUserRequest request) {
        System.out.println(String.format("\n\n\n Received Create user request: %s %s\n\n\n", request.getName(), request.getAvatarUrl()));
        return usersOperations.createUser(request.getName(), request.getAvatarUrl(),
                request.getUsername(), request.getPassword());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/user/{userId}/logout")
    public void logout(@PathVariable(value = "userId") String userId) {
        // Reset session token
        usersOperations.resetSessionToken(UUID.fromString(userId));
    }

}
