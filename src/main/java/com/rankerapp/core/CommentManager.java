package com.rankerapp.core;

import com.rankerapp.db.CommentsRepository;
import com.rankerapp.db.ListsRepository;
import com.rankerapp.db.UsersRepository;
import com.rankerapp.db.model.CommentEntity;
import com.rankerapp.exceptions.NotFoundException;
import com.rankerapp.transport.model.Comment;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CommentManager {

    private final int MAX_PAGE_SIZE = 50;

    private final CommentsRepository commentsRepository;

    private final UsersRepository usersRepository;

    private final ListsRepository listsRepository;

    @Inject
    public CommentManager(CommentsRepository commentsRepository, UsersRepository usersRepository,
                          ListsRepository listsRepository) {
        this.commentsRepository = commentsRepository;
        this.usersRepository = usersRepository;
        this.listsRepository = listsRepository;
    }

    @Transactional
    public void postComment(UUID listId, UUID userId, String contents) {
        if (!usersRepository.existsById(userId)) {
            throw new NotFoundException("User with id " + userId + " not found");
        }

        CommentEntity comment = new CommentEntity();
        comment.setId(UUID.randomUUID());
        comment.setPostedBy(userId);
        comment.setListId(listId);
        comment.setContents(contents);
        comment.setCreatedOn(Instant.now());
        commentsRepository.save(comment);
    }

    @Transactional
    public List<Comment> getComments(UUID listId, int pageNumber) {
        if (!listsRepository.existsById(listId)) {
            throw new NotFoundException("List with id " + listId + " not found");
        }

        PageRequest pageRequest =
                PageRequest.of(pageNumber, MAX_PAGE_SIZE, Sort.by(Sort.Order.desc("createdOn")));
        return commentsRepository.findByListId(listId, pageRequest)
                .map(CommentManager::convertToTransportModel)
                .collect(Collectors.toList());
    }

    private static Comment convertToTransportModel(CommentEntity entity) {
        return Comment.builder()
                .withComment(entity.getContents())
                .withCreatedOn(entity.getCreatedOn())
                .withPostedBy(entity.getPostedBy())
                .build();
    }
}
