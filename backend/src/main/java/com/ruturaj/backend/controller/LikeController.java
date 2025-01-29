package com.ruturaj.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ruturaj.backend.modal.Like;
import com.ruturaj.backend.service.LikeService;

@RestController
@RequestMapping("/app/like")
@CrossOrigin(origins = "http://localhost:3000/")

public class LikeController {

    @Autowired
    private LikeService likeService;

    // Add Like
    @PostMapping("/addlike")
    public String addLike(@RequestParam long userId, @RequestParam long postId) {
        Like like = likeService.likePost(userId, postId);
        return (like == null) ? "Disliked" : "Liked";
    }

    // Check all likes
    @GetMapping("/alllikes")
    public List<Like> allLikes() {
        return likeService.allLikes();
    }

    // Get likes of particular post
    @GetMapping("/userlike")
    public List<Like> userLike(@RequestParam long userId) {
        return likeService.getLikesByUser(userId);
    }

}
