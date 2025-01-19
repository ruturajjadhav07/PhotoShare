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

    public List<Comment> getComment( Long postId) {

        // userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found " + userId));

        postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("Post not found " + postId));

        // return commentRepository.findByUserIdAndPostId(user, post);
        // return commentRepository.findByUserIdAndPostId(postId);

        return commentRepository.findByPostId(postId);
    }
}
