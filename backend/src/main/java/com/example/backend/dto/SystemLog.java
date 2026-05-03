package com.example.backend.dto;

public class SystemLog {
    private String id;
    private String service;
    private String message;
    private long timestamp;
    private String type;

    public SystemLog() {}
    public SystemLog(String id, String service, String message, long timestamp, String type) {
        this.id = id;
        this.service = service;
        this.message = message;
        this.timestamp = timestamp;
        this.type = type;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getService() { return service; }
    public void setService(String service) { this.service = service; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
