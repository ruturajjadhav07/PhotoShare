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

    // user register service

    public User registerUser(String username, String password, String email, String contact) {

        String validUsername = "^[a-z]\\w{4,}$"; // Valid username regex
        String validPassword = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d_@#$%^&+=]{8,}$"; // Valid password regex
        String validEmail = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"; // Valid email regex

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

        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already taken");
        }
        if (userRepository.existsByContact(contact)) {
            throw new IllegalArgumentException("Number already taken");
        }

        // Validate the username, password, and email with regex

        if (username.equals(password)) {
            throw new IllegalArgumentException("username and Password cannot be same");
        }

        if (!username.matches(validUsername)) {
            throw new IllegalArgumentException("Username must be lowercase and at least 5 characters long");
        }

        if (!password.matches(validPassword)) {
            throw new IllegalArgumentException(
                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit, with optional special characters.");
        }

        if (!email.matches(validEmail)) {
            throw new IllegalArgumentException("Invalid email format");
        }

        // Create and save the user
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

    // Delete User by own
    public void delete(long userId, String password) {

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Please enter password!");
        }

        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Password is Incorrect");
        }

        user.setPassword(password);
        userRepository.deleteById(userId);
    }
}
