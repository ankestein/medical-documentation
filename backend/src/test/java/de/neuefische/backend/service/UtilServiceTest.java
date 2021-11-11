package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


class UtilServiceTest {

    private final UtilService utilService = new UtilService();

    @Test
    void mapAppointmentDtoToAppointmentTest() {
        // GIVEN
        AppointmentDto appointmentDto = AppointmentDto.builder()
                .date("2021-11-08")
                .reasonForVisit("checkup")
                .build();

        // WHEN
        Appointment actualAppointment = utilService.mapAppointmentDtoToAppointment(appointmentDto);

        // THEN
        Appointment expectedAppointment = Appointment.builder()
                .date("2021-11-08")
                .reasonForVisit("checkup")
                .build();

        assertEquals(expectedAppointment, actualAppointment);
    }

    @Test
    void mapDoctorDtoToDoctorTest() {
        // GIVEN
        DoctorDto doctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .appointmentDto(AppointmentDto.builder()
                        .date("2021-11-08")
                        .reasonForVisit("checkup")
                        .build())
                .build();

        // WHEN
        Doctor actualDoctor = utilService.mapDoctorDtoToDoctor(doctorDto);

        // THEN
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

        assertEquals(expectedDoctor, actualDoctor);
    }


    @Test
    void mapDoctorDtoWithoutAppointmentToDoctorTest() {
        // GIVEN
        DoctorDto doctorDto = DoctorDto.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        // WHEN
        Doctor actualDoctor = utilService.mapDoctorDtoToDoctor(doctorDto);

        // THEN
        Doctor expectedDoctor = Doctor.builder()
                .firstName("Linda")
                .lastName("Holder")
                .specialty("Dentist")
                .city("Bonn")
                .build();

        assertEquals(expectedDoctor, actualDoctor);
    }

}
