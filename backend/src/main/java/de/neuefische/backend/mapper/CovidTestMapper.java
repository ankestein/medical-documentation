package de.neuefische.backend.mapper;

import de.neuefische.backend.dto.CovidTestDto;
import de.neuefische.backend.model.CovidTest;


public class CovidTestMapper {

    private CovidTestMapper() {}

    public static CovidTest mapCovidTestDtoToCovidTest(CovidTestDto covidTestDto) {
        return CovidTest.builder()
                .id(covidTestDto.getId())
                .testType(covidTestDto.getTestType())
                .dateTime(covidTestDto.getDateTime())
                .result(covidTestDto.getResult())
                .build();
    }
}