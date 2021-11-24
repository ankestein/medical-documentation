package de.neuefische.backend.controller;

import de.neuefische.backend.dto.CovidTestDto;
import de.neuefische.backend.mapper.CovidTestMapper;
import de.neuefische.backend.model.CovidTest;
import de.neuefische.backend.model.TestType;
import de.neuefische.backend.repo.CovidTestRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repo.AppUserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.arrayContainingInAnyOrder;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CovidTestControllerTest {

    @Autowired
    private AppUserRepo appUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private CovidTestRepo covidTestRepo;

    @BeforeEach
    public void clearDb() {
        covidTestRepo.deleteAll();
    }


    @Test
    void addCovidTestTest() {
        HttpHeaders headers = getHttpHeadersWithJWT();

        // GIVEN
        CovidTestDto covidTestDto = CovidTestDto.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build();

        CovidTest expectedCovidTest = CovidTestMapper.mapCovidTestDtoToCovidTest(covidTestDto);

        // WHEN
        ResponseEntity<CovidTest> response = testRestTemplate.exchange("/api/covid-test", HttpMethod.POST, new HttpEntity<>(covidTestDto, headers), CovidTest.class);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());

        CovidTest actual = response.getBody();
        assertNotNull(actual);
        String actualId = actual.getId();
        assertNotNull(actualId);
        expectedCovidTest.setId(actualId);

        assertEquals(expectedCovidTest, actual);

        // THEN - check via GET if element was actually added
        ResponseEntity<CovidTest> getResponse = testRestTemplate.exchange("/api/covid-test/" + actualId, HttpMethod.GET, new HttpEntity<>(headers), CovidTest.class);
        CovidTest persistedCovidTest = getResponse.getBody();

        assertNotNull(persistedCovidTest);
        assertEquals(expectedCovidTest, persistedCovidTest);

    }


    @Test
    void getCovidTestsTest() {
        HttpHeaders headers = getHttpHeadersWithJWT();

        // GIVEN
        CovidTest covidTest1 = CovidTest.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 15, 7, 5))
                .build();

        CovidTest covidTest2 = CovidTest.builder()
                .testType(TestType.ANTIGEN_NASAL)
                .dateTime(LocalDateTime.of(2021, 11, 11, 8, 10))
                .build();

        covidTestRepo.save(covidTest1);
        covidTestRepo.save(covidTest2);

        // WHEN
        ResponseEntity<CovidTest[]> response = testRestTemplate.exchange("/api/covid-test", HttpMethod.GET, new HttpEntity<>(headers), CovidTest[].class);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertThat(response.getBody(), arrayContainingInAnyOrder(covidTest1, covidTest2));

    }

    private HttpHeaders getHttpHeadersWithJWT() {
        appUserRepo.save(AppUser.builder()
                .username("test_username")
                .password(passwordEncoder.encode("some-password"))
                .build());
        AppUser loginData = new AppUser("test_username", "some-password");
        ResponseEntity<String> response = testRestTemplate.postForEntity("/auth/login", loginData, String.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(response.getBody());
        return headers;
    }


}
