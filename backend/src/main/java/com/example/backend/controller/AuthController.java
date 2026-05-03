package com.example.backend.controller;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.User;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/otp")
    public ResponseEntity<Void> sendOtp(@RequestBody AuthRequest request) {
        userService.sendOtp(request.getPhoneNumber());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/verify")
    public ResponseEntity<User> verifyOtp(@RequestBody AuthRequest request) {
        User user = userService.verifyOtp(request.getPhoneNumber(), request.getOtp());
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.status(401).build();
    }
}
