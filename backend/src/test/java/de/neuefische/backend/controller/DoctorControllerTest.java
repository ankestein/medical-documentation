package de.neuefische.backend.controller;

import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Address;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.model.PhoneNumber;
import de.neuefische.backend.model.PhoneType;
import de.neuefische.backend.repo.DoctorRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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


    // test non-existing phone Type
    // test adding doctor that is already in database (add exception to service? but which fields to compare?)
    // test missing required fields? only make them required in frontend form?
}
