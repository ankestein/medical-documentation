package de.neuefische.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {

    private IdService() {

    }

    public static String generateId() {
        return UUID.randomUUID().toString();
    }
}

