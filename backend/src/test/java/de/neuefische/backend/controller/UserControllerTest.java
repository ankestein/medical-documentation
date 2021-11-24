package de.neuefische.backend.controller;

import de.neuefische.backend.dto.UserResponseDto;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repo.AppUserRepo;
import de.neuefische.backend.security.service.JWTUtilService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = "neuefische.meddoc.jwt.secret=dev-secret-54321")
class UserControllerTest {

    @Autowired
    private AppUserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTUtilService jwtUtilService;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getLoggedInUserWithValidToken() {
        //GIVEN
        HttpHeaders headers = getHttpHeadersWithJWT();
        //WHEN
        ResponseEntity<UserResponseDto> response = restTemplate.exchange("/api/user/me", HttpMethod.GET, new HttpEntity<>(headers), UserResponseDto.class);
        //THEN

        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertEquals("test_username", response.getBody().getUsername());
    }

    @Test
    void getLoggedInUserWithInvalidToken() {
        //GIVEN
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth("ey.dasistkeinrichtigertoken.sanfosih");
        //WHEN
        ResponseEntity<UserResponseDto> response = restTemplate.exchange("/api/user/me", HttpMethod.GET, new HttpEntity<>(headers), UserResponseDto.class);
        //THEN

        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }

    @Test
    void getLoggedInUserWithExpiredToken() {
        //GIVEN
        HttpHeaders headers = new HttpHeaders();

        ReflectionTestUtils.setField(jwtUtilService, "duration", 1);
        headers.setBearerAuth(jwtUtilService.createToken(new HashMap<>(), "test_username"));

        //WHEN
        ResponseEntity<UserResponseDto> response = restTemplate.exchange("/api/user/me", HttpMethod.GET, new HttpEntity<>(headers), UserResponseDto.class);
        //THEN

        assertThat(response.getStatusCode(), is(HttpStatus.FORBIDDEN));
    }


    private HttpHeaders getHttpHeadersWithJWT() {
        userRepo.save(AppUser.builder().username("test_username").password(passwordEncoder.encode("some-password")).build());
        AppUser loginData = new AppUser("test_username", "some-password");
        ResponseEntity<String> response = restTemplate.postForEntity("/auth/login", loginData, String.class);
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(response.getBody());
        return headers;
    }
}