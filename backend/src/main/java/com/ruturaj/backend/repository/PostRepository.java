package com.ruturaj.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ruturaj.backend.modal.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByUserId(Long userId);

    boolean existsByIdAndUserId(Long postId, Long userId);

    List<Post> findAllByOrderByTimestampDesc();

}
