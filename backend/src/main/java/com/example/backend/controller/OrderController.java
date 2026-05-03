package com.example.backend.controller;

import com.example.backend.dto.OrderRequest;
import com.example.backend.service.EventStreamService;
import com.example.backend.service.SagaCoordinator;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class OrderController {
    private final SagaCoordinator sagaCoordinator;
    private final EventStreamService eventStream;

    public OrderController(SagaCoordinator sagaCoordinator, EventStreamService eventStream) {
        this.sagaCoordinator = sagaCoordinator;
        this.eventStream = eventStream;
    }

    @PostMapping("/orders")
    public CompletableFuture<ResponseEntity<Boolean>> createOrder(@RequestBody OrderRequest request) {
        return sagaCoordinator.executeOrder(request.getOrderId(), request.getItems())
                .thenApply(success -> success ? ResponseEntity.ok(true) : ResponseEntity.status(400).body(false));
    }

    @GetMapping("/events")
    public SseEmitter streamEvents() {
        return eventStream.subscribe();
    }
}
