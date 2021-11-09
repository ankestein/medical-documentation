package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class DoctorServiceTest {

    private final DoctorRepo doctorRepo = mock(DoctorRepo.class);
    private final UtilService utilService = mock(UtilService.class);
    private final DoctorService doctorService = new DoctorService(doctorRepo, utilService);

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
        when(utilService.mapDoctorDtoToDoctor(expectedDoctorDto)).thenReturn(expectedDoctor);

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

        Doctor expectedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        when(utilService.mapDoctorDtoToDoctor(expectedDoctorDto)).thenReturn(expectedDoctor);
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
    @DisplayName("addAppointment should add a new appointment to the database")
    void addAppointmentTest() {
        // GIVEN
        DoctorDto expectedDoctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointmentDto(AppointmentDto.builder()
                        .date("2021-11-08")
                        .reasonForVisit("checkup")
                        .build())
                .build();

        Doctor expectedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointments(List.of(
                        Appointment.builder()
                                .date("2021-11-08")
                                .reasonForVisit("checkup")
                                .build()
                ))
                .build();

        when(doctorRepo.save(expectedDoctor)).thenReturn(expectedDoctor);
        when(utilService.mapDoctorDtoToDoctor(expectedDoctorDto)).thenReturn(expectedDoctor);
        when(utilService.mapAppointmentDtoToAppointment(expectedDoctorDto.getAppointmentDto())).thenReturn(expectedDoctor.getAppointments().get(0));

        // WHEN
        Doctor actualDoctor = doctorService.addAppointment(expectedDoctorDto);

        // THEN
        assertEquals(expectedDoctor, actualDoctor);
        verify(doctorRepo).save(expectedDoctor);
    }

    //TODO
    // Check addAppointment if doctor already exists in the database (how to do with mocking?)
    // Check exception if appointment already exists
}
