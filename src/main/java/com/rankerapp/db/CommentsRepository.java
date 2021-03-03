package com.rankerapp.db;

import com.rankerapp.db.model.CommentEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.stream.Stream;

public interface CommentsRepository extends JpaRepository<CommentEntity, UUID> {

    Stream<CommentEntity> findByListId(UUID listId, Pageable pageable);

    Long deleteByListIdAndCommentId(UUID listId, UUID commentId);

}
