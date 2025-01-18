package com.ruturaj.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ruturaj.backend.modal.Comment;
import com.ruturaj.backend.modal.User;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<User> findByUserId(Long userId);

    // finding comments for specific post
    List<Comment> findByPost_Id(Long postId);

}
