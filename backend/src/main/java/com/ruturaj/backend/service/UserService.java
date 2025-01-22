package com.ruturaj.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ruturaj.backend.modal.User;
import com.ruturaj.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // user register service
    public User registerUser(String username, String password, String email, String contact) {

        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot empty");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot empty");
        }
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (contact == null || contact.isEmpty()) {
            throw new IllegalArgumentException("Contact cannot be empty");
        }

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already taken");
        }
        if (userRepository.existsByContact(contact)) {
            throw new IllegalArgumentException("Number already taken");
        }
        User user = new User();

        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setContact(contact);
        return userRepository.save(user);
    }

    // user login service

    public User login(String username, String password) {
        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }

        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }
        if (!password.equals(user.getPassword())) {
            throw new IllegalArgumentException("Incorrect Password");
        }

        return user;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }
 
    // User Edit

    public User editUser(Long userId, String username, String password, String email, String contact) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User Id not found"));

        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be empty");
        }
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be empty");
        }
        if (contact == null || contact.isEmpty()) {
            throw new IllegalArgumentException("Contact cannot be empty");
        }

        user.setUsername(username);
        user.setPassword(password);
        user.setEmail(email);
        user.setContact(contact);

        return userRepository.save(user);
    }
}
