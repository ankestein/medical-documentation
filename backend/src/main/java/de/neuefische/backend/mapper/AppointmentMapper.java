package de.neuefische.backend.mapper;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.model.Appointment;


public class AppointmentMapper {

    private AppointmentMapper() {}

    public static Appointment mapAppointmentDtoToAppointment(AppointmentDto appointmentDto) {
        return Appointment.builder()
                .date(appointmentDto.getDate())
                .reasonForVisit(appointmentDto.getReasonForVisit())
                .notes(appointmentDto.getNotes())
                .reminder(appointmentDto.getReminder())
                .examination(appointmentDto.getExamination())
                .doctorsReply(appointmentDto.getDoctorsReply())
                .medication(appointmentDto.getMedication())
                .bloodSampling(appointmentDto.getBloodSampling())
                .imagingType(appointmentDto.getImagingType())
                .build();
    }
}