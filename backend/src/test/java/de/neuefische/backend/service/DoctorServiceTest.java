package de.neuefische.backend.service;

import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Address;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.model.PhoneNumber;
import de.neuefische.backend.model.PhoneType;
import de.neuefische.backend.repo.DoctorRepo;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class DoctorServiceTest {

    private final DoctorRepo doctorRepo = mock(DoctorRepo.class);
    private final DoctorService doctorService = new DoctorService(doctorRepo);

    @Test
    void addDoctor() {
        // GIVEN
        DoctorDto expectedDoctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .address(Address.builder()
                        .city("Bonn")
                        .build())
                .phoneNumbers(List.of(
                        PhoneNumber.builder()
                                .areaCode("0228")
                                .numberSuffix("12345")
                                .phoneType(PhoneType.LAND_LINE)
                                .build()
                        ,
                        PhoneNumber.builder()
                                .countryCode("+49")
                                .areaCode("172")
                                .numberSuffix("33333")
                                .phoneType(PhoneType.MOBILE)
                                .build()
                ))
                .build();

        Doctor expectedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .address(Address.builder()
                        .city("Bonn")
                        .build())
                .phoneNumbers(List.of(
                        PhoneNumber.builder()
                                .areaCode("0228")
                                .numberSuffix("12345")
                                .phoneType(PhoneType.LAND_LINE)
                                .build()
                        ,
                        PhoneNumber.builder()
                                .countryCode("+49")
                                .areaCode("172")
                                .numberSuffix("33333")
                                .phoneType(PhoneType.MOBILE)
                                .build()
                ))
                .build();

        when(doctorRepo.save(expectedDoctor)).thenReturn(expectedDoctor);

        // WHEN
        Doctor actualDoctor = doctorService.addDoctor(expectedDoctorDto);

        // THEN
        assertEquals(expectedDoctor, actualDoctor);
        verify(doctorRepo).save(expectedDoctor);
    }
}
