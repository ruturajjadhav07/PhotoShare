package com.ruturaj.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.repository.PostRepository;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    private PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post post(String content, String img_url, User user) {
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Post content cannot be empty");
        }

        if (img_url == null || img_url.isEmpty()) {
            throw new IllegalArgumentException("Please select an image");
        }

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        Post post = new Post();
        post.setContent(content);
        post.setImageUrl(img_url);
        post.setTimestamp(LocalDateTime.now()); // Automatically set the timestamp
        post.setUser(user);

        return postRepository.save(post);
    }

    public List<Post> findByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

}
