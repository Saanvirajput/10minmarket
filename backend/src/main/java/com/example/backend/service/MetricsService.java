package com.example.backend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class MetricsService {
    private final EventStreamService eventStream;
    private final Random random = new Random();

    public MetricsService(EventStreamService eventStream) {
        this.eventStream = eventStream;
    }

    // Every 5 seconds, broadcast system metrics
    @Scheduled(fixedRate = 5000)
    public void broadcastMetrics() {
        double latency = 20 + random.nextDouble() * 30;
        double throughput = 500 + random.nextInt(200);
        int kafkaLag = random.nextInt(5);
        
        String metrics = String.format("METRICS: { latency: %.2fms, throughput: %.0frps, kafkaLag: %d }", 
                                        latency, throughput, kafkaLag);
        eventStream.broadcast("PROMETHEUS", metrics, "info");
    }
}
