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
            throw new IllegalArgumentException("Post not found");
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

    public String deleteComment(long commentId, long userId, long postId) {
        // Fetch the comment
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        // Validate post association
        if (!comment.getPost().getId().equals(postId)) {
            throw new IllegalArgumentException("Comment does not belong to the specified post");
        }

        // Check if the user is either the comment owner or the post owner
        boolean isCommentOwner = comment.getUser().getId().equals(userId);
        boolean isPostOwner = comment.getPost().getUser().getId().equals(userId);

        if (!isCommentOwner && !isPostOwner) {
            throw new IllegalArgumentException("You cannot delete this comment");
        }

        // Delete the comment
        commentRepository.delete(comment);
        return "Comment deleted Successfully";
    }

}