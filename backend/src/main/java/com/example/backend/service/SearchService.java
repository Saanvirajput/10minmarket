package com.example.backend.service;

import org.springframework.stereotype.Service;

@Service
public class SearchService {
    private final EventStreamService eventStream;

    public SearchService(EventStreamService eventStream) {
        this.eventStream = eventStream;
    }

    public void logSearch(String query) {
        eventStream.broadcast("ELASTICSEARCH", "Indexing & Searching for query: '" + query + "'", "info");
    }
}
