package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import de.neuefische.backend.service.UtilService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.arrayContainingInAnyOrder;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DoctorControllerTest {

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private DoctorRepo doctorRepo;

    @Autowired
    private UtilService utilService;

    @BeforeEach
    public void clearDb() {
        doctorRepo.deleteAll();
    }

    @Test
    void addDoctorTest() {
        // GIVEN
        DoctorDto doctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .phoneNumber("022812345")
                .build();

        Doctor expectedDoctor = utilService.mapDoctorDtoToDoctor(doctorDto);

        // WHEN
        ResponseEntity<Doctor> response = testRestTemplate.postForEntity("/api/doctor", doctorDto, Doctor.class);
        Doctor actual = response.getBody();
        String actualId = actual.getId();

        // THEN
        expectedDoctor.setId(actualId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedDoctor, actual);

        // THEN - check via GET if element was actually added
        ResponseEntity<Doctor> getResponse = testRestTemplate.getForEntity("/api/doctor/" + actualId, Doctor.class);
        Doctor persistedDoctor = getResponse.getBody();

        assertNotNull(persistedDoctor);
        assertEquals(expectedDoctor, persistedDoctor);

    }


    @Test
    void addAppointmentTest() {
        // GIVEN
        AppointmentDto appointmentDto = (AppointmentDto.builder()
                .date("2021-11-08")
                .reasonForVisit("checkup")
                .build());

        DoctorDto doctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointmentDto(appointmentDto)
                .build();

        Doctor expectedDoctor = utilService.mapDoctorDtoToDoctor(doctorDto);
        Appointment appointment = expectedDoctor.getAppointments().get(0);

        // WHEN
        ResponseEntity<Doctor> response = testRestTemplate.exchange("/api/doctor/appointment", HttpMethod.PUT, new HttpEntity<>(doctorDto), Doctor.class);
        Doctor actual = response.getBody();
        String actualDoctorId = actual.getId();
        String actualAppointmentId = actual.getAppointments().get(0).getId();

        // THEN
        appointment.setId(actualAppointmentId);
        expectedDoctor.setAppointments(List.of(appointment));
        expectedDoctor.setId(actualDoctorId);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedDoctor, actual);

        // THEN - check via GET if element was actually added
        ResponseEntity<Doctor> getResponse = testRestTemplate.getForEntity("/api/doctor/" + actualDoctorId, Doctor.class);
        Doctor persistedDoctor = getResponse.getBody();

        assertNotNull(persistedDoctor);
        assertEquals(expectedDoctor, persistedDoctor);

    }


    @Test
    void getDoctorsTest() {
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
        ResponseEntity<Doctor[]> response = testRestTemplate.getForEntity("/api/doctor", Doctor[].class);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertThat(response.getBody(), arrayContainingInAnyOrder(doctor1, doctor2));

    }

}
