package com.rankerapp.core;

import com.rankerapp.db.CommentsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.CommentEntity;
import com.rankerapp.exceptions.NotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.UUID;

@Component
public class CommentManager {

    private final CommentsRepository commentsRepository;

    private final UsersRepository usersRepository;

    @Inject
    public CommentManager(CommentsRepository commentsRepository, UsersRepository usersRepository) {
        this.commentsRepository = commentsRepository;
        this.usersRepository = usersRepository;
    }

    @Transactional
    public void postComment(UUID listId, UUID userId, String contents) {
        if (!usersRepository.existsById(userId)) {
            throw new NotFoundException("User with id " + userId + " not found");
        }

        CommentEntity comment = new CommentEntity();
        comment.setPostedBy(userId);
        comment.setListId(listId);
        comment.setContents(contents);
        commentsRepository.save(comment);
    }
}
