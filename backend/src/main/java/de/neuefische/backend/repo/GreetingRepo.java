package de.neuefische.backend.repo;

import de.neuefische.backend.model.Greeting;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GreetingRepo extends PagingAndSortingRepository<Greeting, String> {

    List<Greeting> findAll();
}
