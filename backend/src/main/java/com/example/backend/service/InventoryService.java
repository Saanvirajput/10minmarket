package com.example.backend.service;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class InventoryService {
    private final Map<String, Integer> stock = new ConcurrentHashMap<>();
    private final EventStreamService eventStream;

    public InventoryService(EventStreamService eventStream) {
        this.eventStream = eventStream;
        // Seed data for all products p1 through p18
        for (int i = 1; i <= 18; i++) {
            stock.put("p" + i, 50);
        }
    }

    public synchronized boolean reserve(String productId, int quantity) {
        int current = stock.getOrDefault(productId, 50);
        if (current < quantity) {
            eventStream.broadcast("REDIS", "Stock check failed for " + productId + ". Available: " + current, "error");
            return false;
        }
        stock.put(productId, current - quantity);
        eventStream.broadcast("REDIS", "Atomic DECR on stock:" + productId + ". New: " + (current - quantity), "success");
        return true;
    }

    public void restore(String productId, int quantity) {
        int current = stock.getOrDefault(productId, 50);
        stock.put(productId, current + quantity);
        eventStream.broadcast("REDIS", "Atomic INCR on stock:" + productId + " (Rollback). New: " + (current + quantity), "warning");
    }

    public int getStock(String productId) {
        return stock.getOrDefault(productId, 50);
    }
}
