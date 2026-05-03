package com.example.backend.dto;

import java.util.List;

public class OrderRequest {
    private String orderId;
    private List<OrderItem> items;

    public OrderRequest() {}
    public OrderRequest(String orderId, List<OrderItem> items) {
        this.orderId = orderId;
        this.items = items;
    }

    public String getOrderId() { return orderId; }
    public void setOrderId(String orderId) { this.orderId = orderId; }
    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }
}
