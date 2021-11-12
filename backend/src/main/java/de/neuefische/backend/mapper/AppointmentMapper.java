package de.neuefische.backend.mapper;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.model.Appointment;

import java.time.LocalDate;

public class AppointmentMapper {

    private AppointmentMapper() {}

    public static Appointment mapAppointmentDtoToAppointment(AppointmentDto appointmentDto) {
        return Appointment.builder()
                .date(LocalDate.parse(appointmentDto.getDate()))
                .reasonForVisit(appointmentDto.getReasonForVisit())
                .notes(appointmentDto.getNotes())
                .build();
    }
}