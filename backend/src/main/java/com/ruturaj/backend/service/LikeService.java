package com.ruturaj.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ruturaj.backend.modal.Like;
import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.repository.LikeRepository;
import com.ruturaj.backend.repository.PostRepository;
import com.ruturaj.backend.repository.UserRepository;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    public Like likePost(long userId, long postId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        // if (likeRepository.existsByUserIdAndPostId(userId, postId)) {
        // throw new IllegalArgumentException("You have already liked a post");
        // }

        Like existLike = likeRepository.findByUserIdAndPostId(userId, postId);
        if (existLike != null) {
            likeRepository.delete(existLike);
            return null;
        }

        Like like = new Like();
        like.setUser(user);
        like.setPost(post);
        return likeRepository.save(like);

    }

    // check all likes
    public List<Like> allLikes() {
        return likeRepository.findAll();
    }

    // get user likes to post

    public List<Like> getLikesByUser(long userId) {
        List<Like> likes = likeRepository.findLikeByUserId(userId);

        // if (likes.isEmpty()) {
        // throw new IllegalArgumentException("No likes found for the user");
        // }
        return likes;
    }

}
