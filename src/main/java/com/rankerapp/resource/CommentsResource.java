package com.rankerapp.resource;

import com.rankerapp.core.CommentManager;
import com.rankerapp.core.SessionTokenAuthenticator;
import com.rankerapp.exceptions.BadRequestException;
import com.rankerapp.transport.model.PostCommentRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.UUID;

@RestController
public class CommentsResource {

    private final CommentManager commentManager;

    private final SessionTokenAuthenticator sessionTokenAuthenticator;

    @Inject
    public CommentsResource(CommentManager commentManager, SessionTokenAuthenticator sessionTokenAuthenticator) {
        this.commentManager = commentManager;
        this.sessionTokenAuthenticator = sessionTokenAuthenticator;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/list/{listId}/comment")
    public void postComment(@PathVariable(value = "listId") String listId, @RequestBody PostCommentRequest request) {
        if (StringUtils.isEmpty(request.getComment())) {
            throw new BadRequestException("Empty comments not allowed");
        }

        sessionTokenAuthenticator.verifySessionToken(UUID.fromString(request.getUserId()), request.getSessionToken());
        commentManager.postComment(UUID.fromString(listId), UUID.fromString(request.getUserId()), request.getComment());
    }
}
