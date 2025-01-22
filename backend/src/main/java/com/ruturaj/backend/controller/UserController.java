package com.ruturaj.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.service.UserService;

import java.util.List;

@RestController 
@RequestMapping("/app")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

    @Autowired
    private UserService userService;

    // Register user details
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user.getUsername(), user.getPassword(), user.getEmail(), user.getContact());
    }

    // Login user details
    @PostMapping("/login")
    public User login(@RequestBody User login) {
        return userService.login(login.getUsername(), login.getPassword());
    }

    // Fetch all users except the logged-in one
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Edit details

    @PostMapping("/edituser")
    public User editDetails(@RequestBody User user) {
        return userService.editUser(user.getId(), user.getUsername(), user.getPassword(), user.getEmail(),
                user.getContact());
    }
}
