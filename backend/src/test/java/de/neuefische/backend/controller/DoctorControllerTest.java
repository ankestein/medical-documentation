package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.mapper.AppointmentMapper;
import de.neuefische.backend.mapper.DoctorMapper;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repo.AppUserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.arrayContainingInAnyOrder;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DoctorControllerTest {

    @Autowired
    private AppUserRepo appUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private DoctorRepo doctorRepo;

    @BeforeEach
    public void clearDb() {
        doctorRepo.deleteAll();
    }


    @Test
    void addDoctorTest() {
        HttpHeaders headers = getHttpHeadersWithJWT();

        // GIVEN
        DoctorDto doctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .phoneNumber("022812345")
                .build();

        Doctor expectedDoctor = DoctorMapper.mapDoctorDtoToDoctor(doctorDto);

        // WHEN
        ResponseEntity<Doctor> response = testRestTemplate.exchange("/api/doctor", HttpMethod.POST, new HttpEntity<>(doctorDto, headers), Doctor.class);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Doctor actual = response.getBody();
        assertNotNull(actual);
        String actualId = actual.getId();
        assertNotNull(actualId);
        expectedDoctor.setId(actualId);

        assertEquals(expectedDoctor, actual);

        // THEN - check via GET if element was actually added
        ResponseEntity<Doctor> getResponse = testRestTemplate.exchange("/api/doctor/" + actualId, HttpMethod.GET, new HttpEntity<>(headers), Doctor.class);
        Doctor persistedDoctor = getResponse.getBody();

        assertNotNull(persistedDoctor);
        assertEquals(expectedDoctor, persistedDoctor);

    }


    @Test
    void addAppointmentTest() {
        HttpHeaders headers = getHttpHeadersWithJWT();

        // GIVEN
        AppointmentDto appointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2021, 11, 8))
                .reasonForVisit("checkup")
                .build();

        AppointmentDto oldAppointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2020, 10, 5))
                .reasonForVisit("checkup")
                .build();

        DoctorDto doctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointmentDto(oldAppointmentDto)
                .build();

        Doctor expectedDoctor = DoctorMapper.mapDoctorDtoToDoctor(doctorDto);
        Appointment appointment = AppointmentMapper.mapAppointmentDtoToAppointment(appointmentDto);
        Appointment oldAppointment = AppointmentMapper.mapAppointmentDtoToAppointment(oldAppointmentDto);

        ResponseEntity<Doctor> postResponse = testRestTemplate.exchange("/api/doctor", HttpMethod.POST, new HttpEntity<>(doctorDto, headers), Doctor.class);
        assertNotNull(postResponse.getBody());
        assertNotNull(postResponse.getBody().getId());
        String doctorId = postResponse.getBody().getId();

        // WHEN
        ResponseEntity<Doctor> response = testRestTemplate.exchange("/api/doctor/" + doctorId + "/appointment", HttpMethod.PUT, new HttpEntity<>(appointmentDto, getHttpHeadersWithJWT()), Doctor.class);

        // THEN
        assertEquals(HttpStatus.OK, postResponse.getStatusCode());
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Doctor actual = response.getBody();
        assertNotNull(actual);
        assertNotNull(actual.getId());
        String actualDoctorId = actual.getId();
        List<Appointment> actualAppointments = actual.getAppointments();
        String actualAppointmentId = actualAppointments.get(actualAppointments.size() - 1).getId();
        appointment.setId(actualAppointmentId);

        expectedDoctor.setAppointments(List.of(oldAppointment, appointment));
        expectedDoctor.setId(actualDoctorId);

        assertEquals(expectedDoctor, actual);

        // THEN - check via GET if element was actually added
        ResponseEntity<Doctor> getResponse = testRestTemplate.exchange("/api/doctor/" + actualDoctorId, HttpMethod.GET, new HttpEntity<>(headers), Doctor.class);
        Doctor persistedDoctor = getResponse.getBody();

        assertNotNull(persistedDoctor);
        assertEquals(expectedDoctor, persistedDoctor);

    }


    @Test
    void getDoctorsTest() {
        HttpHeaders headers = getHttpHeadersWithJWT();

        // GIVEN
        Doctor doctor1 = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .phoneNumber("022812345")
                .build();

        Doctor doctor2 = Doctor.builder()
                .firstName("Suse")
                .lastName("Meier")
                .specialty("Oculist")
                .city("Cologne")
                .build();

        doctorRepo.save(doctor1);
        doctorRepo.save(doctor2);

        // WHEN
        ResponseEntity<Doctor[]> response = testRestTemplate.exchange("/api/doctor", HttpMethod.GET, new HttpEntity<>(getHttpHeadersWithJWT()), Doctor[].class);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertThat(response.getBody(), arrayContainingInAnyOrder(doctor1, doctor2));

    }


    @Test
    void deleteDoctorTest() {
        // GIVEN
        Doctor doctor1 = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .phoneNumber("022812345")
                .build();

        Doctor doctor2 = Doctor.builder()
                .id("5678")
                .firstName("Suse")
                .lastName("Meier")
                .specialty("Oculist")
                .city("Cologne")
                .build();
        doctorRepo.save(doctor1);
        doctorRepo.save(doctor2);

        // WHEN
        testRestTemplate.exchange("/api/doctor/1234", HttpMethod.DELETE, new HttpEntity<>(getHttpHeadersWithJWT()), Void.class);

        // THEN
        List<Doctor> doctors = doctorRepo.findAll();
        assertEquals(List.of(doctor2), doctors);

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
