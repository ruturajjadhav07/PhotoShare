package com.ruturaj.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ruturaj.backend.modal.Comment;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findById(Long id);


    List<Comment> findByUserId(Long userId);


    List<Comment> findByPostId(Long postId);  


    boolean findByUserIdAndPostId(Long userId, Long postId);

    

}