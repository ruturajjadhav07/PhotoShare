package com.ruturaj.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.service.PostService;
import com.ruturaj.backend.repository.UserRepository;

@RestController
@RequestMapping("/app/posts")
@CrossOrigin(origins = "http://localhost:3000/")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public Post create(@RequestParam("content") String content,
            @RequestParam("image") MultipartFile image,
            @RequestParam Long userId) {

        // Fetch user data by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return postService.post(content, image, user);
    }

    @GetMapping("/all")
    public List<Post> allPost() {
        return postService.getAllPosts();
    }

    @GetMapping("/users/{userId}")
    public List<Post> userPost(@PathVariable Long userId) {
        return postService.findByUser(userId);
    }

    @DeleteMapping("/delete/{postId}")
    public String deletePost(@PathVariable Long postId ,@RequestParam Long userId) {
        postService.deleteById(postId,userId);
        return "Post deleted successfully";
    }

}
