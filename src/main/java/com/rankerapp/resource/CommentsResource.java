package com.rankerapp.resource;

import com.rankerapp.core.CommentManager;
import com.rankerapp.transport.model.PostCommentRequest;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

@RestController
public class CommentsResource {

    private final CommentManager commentManager;

    @Inject
    public CommentsResource(CommentManager commentManager) {
        this.commentManager = commentManager;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/list/{listId}/comment")
    public void postComment(@PathVariable(value = "listId") String listId, @RequestBody PostCommentRequest request) {
        commentManager.postComment();
    }
}
