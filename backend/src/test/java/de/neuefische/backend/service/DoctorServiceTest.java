package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class DoctorServiceTest {

    private final DoctorRepo doctorRepo = mock(DoctorRepo.class);
    private final DoctorService doctorService = new DoctorService(doctorRepo);

    @Test
    void getDoctorsTest() {
        // GIVEN
        List<Doctor> expectedDoctors = List.of(Doctor.builder()
                .firstName("Adam")
                .lastName("Riese")
                .specialty("General practitioner")
                .city("Bonn")
                .build());
        when(doctorRepo.findAll()).thenReturn(expectedDoctors);

        // WHEN
        List<Doctor> actualDoctors = doctorService.getDoctors();

        // THEN
        assertEquals(expectedDoctors, actualDoctors);
        verify(doctorRepo).findAll();
    }



    @Test
    @DisplayName("addDoctor should add a new doctor to the database")
    void addDoctorTest() {
        // GIVEN
        DoctorDto expectedDoctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .phoneNumber("022812345")
                .build();

        Doctor expectedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .phoneNumber("022812345")
                .build();

        when(doctorRepo.save(expectedDoctor)).thenReturn(expectedDoctor);

        // WHEN
        Doctor actualDoctor = doctorService.addDoctor(expectedDoctorDto);

        // THEN
        assertEquals(expectedDoctor, actualDoctor);
        verify(doctorRepo).save(expectedDoctor);
    }


    @Test
    @DisplayName("Adding a doctor that is already in the database (same first name, last name, specialty and city) should throw an IllegalArgumentException")
    void addExistingDoctorTest() {
        // GIVEN
        DoctorDto expectedDoctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        when(doctorRepo.existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
                "Linda", "Holder", "Dentist", "Bonn")
        ).thenReturn(true);

        // WHEN
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            doctorService.addDoctor(expectedDoctorDto);
        }, "I expected an IllegalArgumentException");

        // THEN
        assertEquals("Doctor Linda Holder, Dentist, Bonn, already exists in the database", thrown.getMessage());
        verify(doctorRepo).existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity("Linda", "Holder", "Dentist", "Bonn");
    }


    @Test
    void testDeleteDoctor() {
        // given
        when(doctorRepo.findById("1234")).thenReturn(Optional.of(Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build()));
        DoctorService doctorService = new DoctorService(doctorRepo);

        // when
        doctorService.deleteDoctor("1234");

        // then
        verify(doctorRepo).deleteById("1234");
    }


    @Test
    @DisplayName("addAppointment should add a new appointment to the database")
    void addAppointmentTest() {
        // GIVEN
        MockedStatic<IdService> idService = mockStatic(IdService.class);

        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2021, 11, 8))
                .reasonForVisit("checkup")
                .build();

        Doctor expectedDoctor = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointments(List.of(
                        Appointment.builder()
                                .id("111111")
                                .date(LocalDate.of(2021, 11, 8))
                                .reasonForVisit("checkup")
                                .build()
                ))
                .build();

        Doctor doctorInDb = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        idService.when(IdService::generateId).thenReturn("111111");
        when(doctorRepo.findById("1234")).thenReturn(Optional.ofNullable(doctorInDb));
        when(doctorRepo.save(expectedDoctor)).thenReturn(expectedDoctor);

        // WHEN
        Doctor actualDoctor = doctorService.addAppointment(expectedAppointmentDto, "1234");

        // THEN
        verify(doctorRepo).findById("1234");
        verify(doctorRepo).save(expectedDoctor);
        assertEquals(expectedDoctor, actualDoctor);

        idService.close();
    }


    @Test
    @DisplayName("Adding an appointment that is already in the database (same date) should throw an IllegalArgumentException")
    void addExistingAppointmentTest() {
        // GIVEN
        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2021, 11, 8))
                .reasonForVisit("checkup")
                .build();

        Doctor doctorInDb = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointments(List.of(
                        Appointment.builder()
                                .id("111111")
                                .date(LocalDate.of(2021, 11, 8))
                                .reasonForVisit("checkup")
                                .build()
                ))
                .build();

        when(doctorRepo.findById("1234")).thenReturn(Optional.ofNullable(doctorInDb));

        // WHEN
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            doctorService.addAppointment(expectedAppointmentDto, "1234");
        }, "I expected an IllegalArgumentException");

        // THEN
        assertEquals("Appointment with Doctor Holder on 2021-11-08 already exists in the database", thrown.getMessage());
        verify(doctorRepo).findById("1234");
    }


    @Test
    @DisplayName("Adding an appointment to a doctor that already exists in the database should add the new appointment to the existing list of appointments")
    void addAppointmentToExistingDoctorTest() {
        // GIVEN
        MockedStatic<IdService> idService = mockStatic(IdService.class);

        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2021, 11, 8))
                .reasonForVisit("checkup")
                .build();


        Doctor doctorInDb = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointments(List.of(
                        Appointment.builder()
                                .id("111111")
                                .date(LocalDate.of(2020,10,2))
                                .reasonForVisit("checkup")
                                .build()
                ))
                .build();

        Doctor updatedDoctor = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointments(List.of(
                        Appointment.builder()
                                .id("111111")
                                .date(LocalDate.of(2020,10,2))
                                .reasonForVisit("checkup")
                                .build(),
                        Appointment.builder()
                                .id("123456")
                                .date(LocalDate.of(2021,11,8))
                                .reasonForVisit("checkup")
                                .build()
                ))
                .build();

        idService.when(IdService::generateId).thenReturn("123456");
        when(doctorRepo.findById("1234")).thenReturn(Optional.ofNullable(doctorInDb));
        assertNotNull(doctorInDb);
        when(doctorRepo.save(doctorInDb)).thenReturn(updatedDoctor);

        // WHEN
        Doctor actualDoctor = doctorService.addAppointment(expectedAppointmentDto, "1234");

        // THEN
        assertEquals(updatedDoctor, actualDoctor);
        verify(doctorRepo).findById("1234");
        verify(doctorRepo).save(doctorInDb);
        idService.verify(IdService::generateId);

        idService.close();
    }



    @Test
    @DisplayName("Adding an appointment to a doctor that already exists in the database without any appointments should add the new appointment")
    void addAppointmentToExistingDoctorWithoutAppointmentsTest() {
        // GIVEN
        MockedStatic<IdService> idService = mockStatic(IdService.class);

        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2021, 11, 8))
                .reasonForVisit("checkup")
                .build();

        Doctor doctorInDb = Doctor.builder()
                .id("1234")
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        Doctor updatedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointments(List.of(
                        Appointment.builder()
                                .id("123456")
                                .date(LocalDate.of(2021,11,8))
                                .reasonForVisit("checkup")
                                .build()
                ))
                .build();

        idService.when(IdService::generateId).thenReturn("123456");
        when(doctorRepo.findById("1234")).thenReturn(Optional.ofNullable(doctorInDb));
        assertNotNull(doctorInDb);
        when(doctorRepo.save(doctorInDb)).thenReturn(updatedDoctor);

        // WHEN
        Doctor actualDoctor = doctorService.addAppointment(expectedAppointmentDto, "1234");

        // THEN
        verify(doctorRepo).findById("1234");
        verify(doctorRepo).save(doctorInDb);
        assertEquals(updatedDoctor, actualDoctor);
        idService.verify(IdService::generateId);

        idService.close();
    }


    @Test
    @DisplayName("Adding an appointment to a doctor that doesn't exist in the database should throw a NoSuchElementException")
    void addAppointmentToNonExistingDoctorTest() {
        // GIVEN
        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .date(LocalDate.of(2021, 11, 8))
                .reasonForVisit("checkup")
                .build();

        when(doctorRepo.findById("1234")).thenReturn(Optional.empty());

        // WHEN
        NoSuchElementException thrown = assertThrows(NoSuchElementException.class, () -> {
            doctorService.addAppointment(expectedAppointmentDto, "1234");
        }, "I expected a NoSuchElementException");

        // THEN
        assertEquals("Doctor with id 1234 not found!", thrown.getMessage());
        verify(doctorRepo).findById("1234");

    }


}
