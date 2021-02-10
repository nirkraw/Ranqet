package com.rankerapp.core;

import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.UserEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.UUID;

@Component
public class SessionTokenAuthenticator {

    private UsersRepository usersRepository;

    @Inject
    public SessionTokenAuthenticator(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Transactional
    public void verifySessionToken(UUID userId, String sessionToken) {
        UserEntity user = usersRepository.getOne(userId);

        if (!user.getSessionToken().equals(sessionToken)) {
            throw new IllegalArgumentException("Stale session token for userId " + userId);
        }
    }

}
