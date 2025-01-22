package com.ruturaj.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ruturaj.backend.modal.Comment;
import com.ruturaj.backend.modal.Post;
import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.repository.CommentRepository;
import com.ruturaj.backend.repository.PostRepository;
import com.ruturaj.backend.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    // Add comment
    public Comment addComment(String content, Long userId, Long postId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Empty comment cannot be posted");
        }

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        if (post == null) {
            throw new IllegalArgumentException("User not found");
        }

        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setPost(post);
        return commentRepository.save(comment);

    }

    // See comments

    public List<Comment> getComment(Long postId) {

        postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found " + postId));

        return commentRepository.findByPostId(postId);
    }

    // public void deleteComment(long commentId, long userId, long postId) {

    //     // Fetch the comment from the repository
    //     Comment comment = commentRepository.findById(commentId)
    //             .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

    //     // Check if the user owns the comment
    //     if (!comment.getUser().getId().equals(userId)) {
    //         throw new IllegalArgumentException("User not authorized to delete this comment");
    //     }

    //     // Check if the comment belongs to the specified post
    //     if (!comment.getPost().getId().equals(postId)) {
    //         throw new IllegalArgumentException("Comment does not belong to the specified post");
    //     }

    //     if (!commentRepository.findByUserIdAndPostId(userId, postId)) {
    //         throw new IllegalArgumentException("You cannot delete comment");
    //     }

    //     // Delete the comment
    //     commentRepository.delete(comment);
    // }


    public void deleteComment(long commentId, long userId, long postId) {
        System.out.println("Attempting to delete comment with ID: " + commentId);
    
        // Fetch the comment
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
    
        System.out.println("Comment fetched: " + comment);
    
        // Validate ownership and post association
        if (!comment.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("User not authorized to delete this comment");
        }
        if (!comment.getPost().getId().equals(postId)) {
            throw new IllegalArgumentException("Comment does not belong to the specified post");
        }
    
        // Optional check if comment exists by user and post (if necessary)
        // if (!commentRepository.existsByUserIdAndPostId(userId, postId)) {
        //     throw new IllegalArgumentException("You cannot delete comment");
        // }
    
        // Delete the comment
        commentRepository.delete(comment);
        System.out.println("Comment deleted successfully.");
    }
    
}