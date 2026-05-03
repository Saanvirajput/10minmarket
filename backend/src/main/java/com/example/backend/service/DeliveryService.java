package com.example.backend.service;

import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class DeliveryService {
    private final EventStreamService eventStream;

    public DeliveryService(EventStreamService eventStream) {
        this.eventStream = eventStream;
    }

    public void startDeliveryFlow(String orderId) {
        new Thread(() -> {
            try {
                Thread.sleep(2000);
                String riderId = "R-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
                eventStream.broadcast("DELIVERY", "Rider " + riderId + " assigned to Order " + orderId, "success");
                
                Thread.sleep(3000);
                eventStream.broadcast("DELIVERY", "TRACKING: { orderId: " + orderId + ", lat: 19.0760, lng: 72.8777 }", "info");
                
                Thread.sleep(3000);
                eventStream.broadcast("DELIVERY", "Order " + orderId + " delivered successfully!", "success");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}
