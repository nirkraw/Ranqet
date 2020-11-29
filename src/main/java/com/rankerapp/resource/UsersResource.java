package com.rankerapp.resource;

import com.rankerapp.core.UsersOperations;
import com.rankerapp.transport.model.CreateUserRequest;
import com.rankerapp.transport.model.User;
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

    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable(value = "userId") String userId) {
        return usersOperations.getUser(UUID.fromString(userId));
    }

    @PostMapping("/user/create")
    public User createUser(@RequestBody CreateUserRequest request) {
        return usersOperations.createUser(request.getName(), request.getAvatarUrl());
    }

}
