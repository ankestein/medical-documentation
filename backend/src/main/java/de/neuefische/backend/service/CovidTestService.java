package de.neuefische.backend.service;

import de.neuefische.backend.dto.CovidTestDto;
import de.neuefische.backend.mapper.CovidTestMapper;
import de.neuefische.backend.model.CovidTest;
import de.neuefische.backend.repo.CovidTestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CovidTestService {
    
    private final CovidTestRepo covidTestRepo;
    
    @Autowired
    public CovidTestService(CovidTestRepo covidTestRepo) {
        this.covidTestRepo = covidTestRepo;
    }

    public List<CovidTest> getCovidTests() {
        return covidTestRepo.findAll();
    }

    public CovidTest getCovidTestById(String id) {
        return covidTestRepo.findById(id).orElseThrow(
                () -> new NoSuchElementException("COVID test with id " + id + " not found!")
        );
    }

    public CovidTest addCovidTest(CovidTestDto covidTestDto) {

        CovidTest covidTest = CovidTestMapper.mapCovidTestDtoToCovidTest(covidTestDto);

        boolean covidTestExists = covidTestRepo.existsCovidTestByDateTime(
                covidTest.getDateTime()
        );

        if (covidTestExists) {
            throw new IllegalArgumentException(covidTestDto + " already exists in the database");
        } else {
            return covidTestRepo.save(covidTest);
        }
    }
    
}
