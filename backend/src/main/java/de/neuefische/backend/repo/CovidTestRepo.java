package de.neuefische.backend.repo;

import de.neuefische.backend.model.CovidTest;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CovidTestRepo extends PagingAndSortingRepository<CovidTest, String> {

    List<CovidTest> findAll();

    Boolean existsCovidTestByDateTime(LocalDateTime dateTime);

}
