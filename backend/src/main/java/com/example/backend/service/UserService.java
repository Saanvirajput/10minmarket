package com.example.backend.service;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.User;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    private final Map<String, String> otps = new ConcurrentHashMap<>();
    private final Map<String, User> users = new ConcurrentHashMap<>();
    private final EventStreamService eventStream;

    public UserService(EventStreamService eventStream) {
        this.eventStream = eventStream;
    }

    public void sendOtp(String phoneNumber) {
        String otp = "123456"; // Fixed for demo
        otps.put(phoneNumber, otp);
        eventStream.broadcast("AUTH", "OTP sent to " + phoneNumber + " (Simulated: 123456)", "info");
    }

    public User verifyOtp(String phoneNumber, String otp) {
        if (otp.equals(otps.get(phoneNumber))) {
            User user = users.computeIfAbsent(phoneNumber, k -> new User(
                UUID.randomUUID().toString(),
                phoneNumber,
                "User " + phoneNumber.substring(7),
                "Mumbai, Maharashtra"
            ));
            eventStream.broadcast("AUTH", "User authenticated: " + user.getId(), "success");
            return user;
        }
        eventStream.broadcast("AUTH", "Invalid OTP for " + phoneNumber, "error");
        return null;
    }
}
