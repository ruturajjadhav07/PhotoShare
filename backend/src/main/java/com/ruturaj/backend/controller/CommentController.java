package com.ruturaj.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ruturaj.backend.modal.Comment;
import com.ruturaj.backend.service.CommentService;

@RestController
@RequestMapping("/app/comment")
@CrossOrigin(origins = "http://localhost:3000/")

public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("/addcomment")
    public Comment addComment(@RequestBody Map<String, Object> requestData) {
        String content = (String) requestData.get("content");
        Long userId = ((Number) requestData.get("userId")).longValue();
        Long postId = ((Number) requestData.get("postId")).longValue();
        return commentService.addComment(content, userId, postId);
    }

    @GetMapping("/getcomment")
    public List<Comment> getComment(@RequestParam Long postId) {
        return commentService.getComment(postId);
    }

    @DeleteMapping("/deletecomment")
    public void deleteComment(@RequestParam("commentId") long commentId, @RequestParam("userId") long userId,
            @RequestParam("postId") long postId) {
        commentService.deleteComment(commentId, userId, postId);
    }

}
