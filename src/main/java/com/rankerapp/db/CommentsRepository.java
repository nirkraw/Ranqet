package com.rankerapp.db;

import com.rankerapp.db.model.CommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentsRepository extends JpaRepository<CommentEntity, UUID> {

}
