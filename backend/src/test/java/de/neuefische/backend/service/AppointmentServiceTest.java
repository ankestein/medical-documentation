package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.repo.AppointmentRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class AppointmentServiceTest {

    private final AppointmentRepo appointmentRepo = mock(AppointmentRepo.class);
    private final UtilService utilService = mock(UtilService.class);
    private final AppointmentService appointmentService = new AppointmentService(appointmentRepo, utilService);

    @Test
    @DisplayName("addAppointment should add a new appointment to the database")
    void addAppointmentTest() {
        // GIVEN
        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .doctorId("1")
                .date("2021-11-08")
                .reasonForVisit("Regular checkup")
                .build();

        Appointment expectedAppointment = Appointment.builder()
                .doctorId("1")
                .date("2021-11-08")
                .reasonForVisit("Regular checkup")
                .build();

        when(appointmentRepo.save(expectedAppointment)).thenReturn(expectedAppointment);
        when(utilService.mapAppointmentDtoToAppointment(expectedAppointmentDto)).thenReturn(expectedAppointment);

        // WHEN
        Appointment actualAppointment = appointmentService.addAppointment(expectedAppointmentDto);

        // THEN
        assertEquals(expectedAppointment, actualAppointment);
        verify(appointmentRepo).save(expectedAppointment);
    }


    @Test
    @DisplayName("Adding an appointment that is already in the database (same doctorId and date) should throw an IllegalArgumentException")
    void addExistingAppointmentTest() {
        // GIVEN
        AppointmentDto expectedAppointmentDto = AppointmentDto.builder()
                .doctorId("1")
                .date("2021-11-08")
                .reasonForVisit("Regular checkup")
                .build();

        Appointment expectedAppointment = Appointment.builder()
                .doctorId("1")
                .date("2021-11-08")
                .reasonForVisit("Regular checkup")
                .build();

        when(utilService.mapAppointmentDtoToAppointment(expectedAppointmentDto)).thenReturn(expectedAppointment);
        when(appointmentRepo.existsAppointmentByDoctorIdAndDate(
                "1", "2021-11-08")
        ).thenReturn(true);

        // WHEN
        IllegalArgumentException thrown = assertThrows(IllegalArgumentException.class, () -> {
            appointmentService.addAppointment(expectedAppointmentDto);
        }, "I expected an IllegalArgumentException");

        // THEN
        assertEquals("Appointment with doctor 1 on 2021-11-08 already exists in the database", thrown.getMessage());
        verify(appointmentRepo).existsAppointmentByDoctorIdAndDate("1", "2021-11-08");
    }
}
