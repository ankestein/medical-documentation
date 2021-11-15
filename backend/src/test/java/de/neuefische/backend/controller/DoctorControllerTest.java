package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.mapper.AppointmentMapper;
import de.neuefische.backend.mapper.DoctorMapper;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DoctorControllerTest {

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
        ResponseEntity<Doctor> response = testRestTemplate.postForEntity("/api/doctor", doctorDto, Doctor.class);

        // THEN
        assertEquals(HttpStatus.OK, response.getStatusCode());

        Doctor actual = response.getBody();
        assertNotNull(actual);
        String actualId = actual.getId();
        assertNotNull(actualId);
        expectedDoctor.setId(actualId);

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

        ResponseEntity<Doctor> postResponse = testRestTemplate.postForEntity("/api/doctor", doctorDto, Doctor.class);
        assertNotNull(postResponse.getBody());
        assertNotNull(postResponse.getBody().getId());
        String doctorId = postResponse.getBody().getId();

        // WHEN
        ResponseEntity<Doctor> response = testRestTemplate.exchange("/api/doctor/" + doctorId + "/appointment", HttpMethod.PUT, new HttpEntity<>(appointmentDto), Doctor.class);

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
        ResponseEntity<Doctor> getResponse = testRestTemplate.getForEntity("/api/doctor/" + actualDoctorId, Doctor.class);
        Doctor persistedDoctor = getResponse.getBody();

        assertNotNull(persistedDoctor);
        assertEquals(expectedDoctor, persistedDoctor);

    }



}
