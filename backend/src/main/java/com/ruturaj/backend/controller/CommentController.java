package com.ruturaj.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ruturaj.backend.modal.Comment;
import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.service.CommentService;
import com.ruturaj.backend.service.PostService;
import com.ruturaj.backend.service.UserService;

@RestController
@RequestMapping("app/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(@RequestBody Map<String, Object> payload) {
        String content = (String) payload.get("content");
        Long postId = Long.parseLong(payload.get("postId").toString());
        Long userId = Long.parseLong(payload.get("userId").toString());

        // Fetch User and Post
        User user = userService.getUserById(userId);
        Post post = postService.getPostById(postId);

        // Add Comment
        Comment comment = commentService.addComment(content, user, post);
        return ResponseEntity.ok(comment);
    }
}
