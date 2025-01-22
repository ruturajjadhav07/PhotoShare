package com.ruturaj.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public Like addLike(@RequestParam long userId, @RequestParam long postId) {
        return likeService.addLike(userId, postId);
        // return null;
    }

    // See or get all like
    @GetMapping("/alllike/{postId}")
    public List<Like> getLikeByPost(@PathVariable long postId) {
        return likeService.getLikesByPost(postId);
    }
}
