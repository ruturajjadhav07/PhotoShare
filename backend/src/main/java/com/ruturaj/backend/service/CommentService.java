package com.ruturaj.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ruturaj.backend.modal.Comment;
import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.repository.CommentRepository;
import com.ruturaj.backend.repository.PostRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

     @Autowired
    private PostRepository postRepository;



    public List<Comment> getCommentsByPost(Long postId) { // Fixed typo
        return commentRepository.findByPost_Id(postId);
    }

    public Comment addComment(String content, User user, Post post) {
        // Validate inputs
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        if (post == null) {
            throw new IllegalArgumentException("Post not found");
        }

        // Create and save comment
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setPost(post);

        return commentRepository.save(comment);
    }


    public Post getPostById(Long postId) {
        return postRepository.findById(postId)
            .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + postId));
    }
}
