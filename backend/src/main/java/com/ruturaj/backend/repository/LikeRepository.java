package com.ruturaj.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ruturaj.backend.modal.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> getByUserId(Long userId);

    List<Like> getByPostId(Long postId);

    boolean existsByPostId(long postId);

    Boolean existsByUserIdAndPostId(Long userId, long postId);

    void deleteByPostId(Long postId);

}
