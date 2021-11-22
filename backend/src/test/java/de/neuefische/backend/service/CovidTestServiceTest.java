package de.neuefische.backend.service;

import de.neuefische.backend.dto.CovidTestDto;
import de.neuefische.backend.model.CovidTest;
import de.neuefische.backend.model.TestType;
import de.neuefische.backend.repo.CovidTestRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CovidTestServiceTest {

    private final CovidTestRepo covidTestRepo = mock(CovidTestRepo.class);
    private final CovidTestService covidTestService = new CovidTestService(covidTestRepo);

    @Test
    void getCovidTestsTest() {
        // GIVEN
        List<CovidTest> expectedCovidTests = List.of(CovidTest.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build());
        when(covidTestRepo.findAll()).thenReturn(expectedCovidTests);

        // WHEN
        List<CovidTest> actualCovidTests = covidTestService.getCovidTests();

        // THEN
        assertEquals(expectedCovidTests, actualCovidTests);
        verify(covidTestRepo).findAll();
    }



    @Test
    @DisplayName("addCovidTest should add a new covidTest to the database")
    void addCovidTestTest() {
        // GIVEN
        CovidTestDto expectedCovidTestDto = CovidTestDto.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build();

        CovidTest expectedCovidTest = CovidTest.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build();

        CovidTest covidTestToSave = CovidTest.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build();

        when(covidTestRepo.save(covidTestToSave)).thenReturn(expectedCovidTest);

        // WHEN
        CovidTest actualCovidTest = covidTestService.addCovidTest(expectedCovidTestDto);

        // THEN
        assertSame(expectedCovidTest, actualCovidTest);
        verify(covidTestRepo).save(expectedCovidTest);
    }


    @Test
    @DisplayName("Adding a covidTest that is already in the database (same dateTime) should throw an IllegalArgumentException")
    void addExistingCovidTestTest() {
        // GIVEN
        CovidTestDto expectedCovidTestDto = CovidTestDto.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build();

        when(covidTestRepo.existsCovidTestByDateTime(LocalDateTime.of(2021, 11, 15, 7, 5))).thenReturn(true);

        // WHEN
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            covidTestService.addCovidTest(expectedCovidTestDto);
        }, "I expected an IllegalArgumentException");

        // THEN
        assertEquals("A COVID test on 2021-11-15T07:05 already exists in the database", thrown.getMessage());
        verify(covidTestRepo).existsCovidTestByDateTime(LocalDateTime.of(2021, 11, 15, 7, 5));
    }

}
