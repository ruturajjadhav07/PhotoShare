package com.ruturaj.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.repository.PostRepository;

@Service
public class PostService {

    private final String path = "C:/Users/jadha/OneDrive/Pictures";

    @Autowired
    private PostRepository postRepository;

    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));
    }

    public Post post(String content, MultipartFile image, User user) {
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Post caption cannot be empty");
        }

        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Please select an image");
        }

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        // Save the image to the file system
        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        String filePath = path + "/" + fileName; // it is '/' for configure path check app properties

        try {
            image.transferTo(new java.io.File(filePath)); // Save file
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage());
        }

        String imageUrl = "http://localhost:8080/" + fileName;

        Post post = new Post();
        post.setContent(content);
        post.setImageUrl(imageUrl); // Store the local file image
        post.setTimestamp(LocalDateTime.now());
        post.setUser(user);

        return postRepository.save(post);

    }

    public List<Post> findByUser(Long userId) {
        return postRepository.findByUserId(userId);
    }

    // public List<Post> getAllPosts() {
    // return postRepository.findAll();
    // }

    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByTimestampDesc(); // Fetch posts sorted by timestamp
    }

    public void deleteById(Long postId, Long UserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        if (!post.getUser().getId().equals(UserId)) {
            throw new IllegalArgumentException("You cannot delete this post");
        }

        if (!postRepository.existsByIdAndUserId(postId, UserId)) {
            throw new IllegalArgumentException("You cannot delete this post");
        }

        postRepository.delete(post);
    }

}
