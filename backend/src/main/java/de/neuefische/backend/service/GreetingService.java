package de.neuefische.backend.service;

import de.neuefische.backend.model.Greeting;
import de.neuefische.backend.repo.GreetingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GreetingService {

    private final GreetingRepo greetingRepo;

    @Autowired
    public GreetingService(GreetingRepo greetingRepo) {
        this.greetingRepo = greetingRepo;
    }

    public List<Greeting> getAllGreetings() {
        return greetingRepo.findAll();
    }
}
