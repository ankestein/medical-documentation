package de.neuefische.backend.service;

import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class DoctorServiceTest {

    private final DoctorRepo doctorRepo = mock(DoctorRepo.class);
    private final DoctorService doctorService = new DoctorService(doctorRepo);

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

        Doctor expectedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        when(doctorRepo.save(expectedDoctor)).thenReturn(expectedDoctor);
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
}
