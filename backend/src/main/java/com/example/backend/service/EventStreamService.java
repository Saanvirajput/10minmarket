package com.example.backend.service;

import com.example.backend.dto.SystemLog;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class EventStreamService {
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.add(emitter);
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        return emitter;
    }

    public void broadcast(String service, String message, String type) {
        SystemLog log = new SystemLog(
                UUID.randomUUID().toString(),
                service,
                message,
                System.currentTimeMillis(),
                type
        );
        
        emitters.forEach(emitter -> {
            try {
                emitter.send(log);
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        });
    }
}
