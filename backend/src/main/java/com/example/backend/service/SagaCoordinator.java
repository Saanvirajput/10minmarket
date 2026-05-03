package com.example.backend.service;

import com.example.backend.dto.OrderItem;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class SagaCoordinator {
    private final InventoryService inventoryService;
    private final EventStreamService eventStream;

    public SagaCoordinator(InventoryService inventoryService, EventStreamService eventStream) {
        this.inventoryService = inventoryService;
        this.eventStream = eventStream;
    }

    public CompletableFuture<Boolean> executeOrder(String orderId, List<OrderItem> items) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                eventStream.broadcast("SAGA", "Initiating Saga for Order " + orderId, "info");
                
                // Step 1: Kafka Event
                Thread.sleep(500);
                eventStream.broadcast("KAFKA", "Topic: order.created, Msg: { orderId: " + orderId + " }", "info");

                // Step 2: Inventory Reservation
                Thread.sleep(800);
                for (OrderItem item : items) {
                    if (!inventoryService.reserve(item.getId(), item.getQuantity())) {
                        rollback(orderId, items);
                        return false;
                    }
                }

                // Step 3: Payment Simulation
                Thread.sleep(1000);
                eventStream.broadcast("PAYMENT", "Processing payment for " + orderId, "info");
                if (Math.random() < 0.1) { // 10% failure rate
                    eventStream.broadcast("PAYMENT", "Payment failed for " + orderId, "error");
                    rollback(orderId, items);
                    return false;
                }

                // Step 4: Final Confirmation
                Thread.sleep(500);
                eventStream.broadcast("KAFKA", "Topic: order.confirmed, Msg: { orderId: " + orderId + " }", "success");
                eventStream.broadcast("SAGA", "Saga completed successfully for " + orderId, "success");
                return true;

            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        });
    }

    private void rollback(String orderId, List<OrderItem> items) {
        eventStream.broadcast("SAGA", "Initiating Compensation for Order " + orderId, "warning");
        items.forEach(item -> inventoryService.restore(item.getId(), item.getQuantity()));
        eventStream.broadcast("SAGA", "Order " + orderId + " rolled back successfully", "error");
    }
}
