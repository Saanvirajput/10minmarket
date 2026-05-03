package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SystemLog {
    private String id;
    private String service; // KAFKA, REDIS, SAGA, etc.
    private String message;
    private long timestamp;
    private String type; // info, success, warning, error
}
