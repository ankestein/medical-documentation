package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CovidTestDto;
import de.neuefische.backend.model.CovidTest;
import de.neuefische.backend.service.CovidTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/covid-test")
public class CovidTestController {

    private final CovidTestService covidTestService;

    @Autowired
    public CovidTestController(CovidTestService covidTestService) {
        this.covidTestService = covidTestService;
    }

    @GetMapping
    public List<CovidTest> getCovidTests() {
        return covidTestService.getCovidTests();
    }

    @GetMapping("/{id}")
    public CovidTest getCovidTestById(@PathVariable String id) {
        return covidTestService.getCovidTestById(id);
    }

    @PostMapping
    public CovidTest addCovidTest(@RequestBody CovidTestDto covidTestDto) {
        return covidTestService.addCovidTest(covidTestDto);
    }

    @PutMapping("/{id}")
    public CovidTest editCovidTest(@RequestBody CovidTestDto covidTestDto, @PathVariable String id) {
        if(!id.equals(covidTestDto.getId())){
            throw new IllegalArgumentException("Could not update element - path id does not match element id in request body!");
        }
        return covidTestService.editCovidTest(covidTestDto);
    }

}
