package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import org.springframework.stereotype.Service;

@Service
public class UtilService {

    public Doctor mapDoctorDtoToDoctor(DoctorDto doctorDto) {
        return Doctor.builder()
                .firstName(doctorDto.getFirstName())
                .lastName(doctorDto.getLastName())
                .specialty(doctorDto.getSpecialty())
                .street(doctorDto.getStreet())
                .streetNumber(doctorDto.getStreetNumber())
                .postalCode(doctorDto.getPostalCode())
                .city(doctorDto.getCity())
                .country(doctorDto.getCountry())
                .phoneNumber(doctorDto.getPhoneNumber())
                .mobileNumber(doctorDto.getMobileNumber())
                .emailAddress(doctorDto.getEmailAddress())
                .build();
    }

    public Appointment mapAppointmentDtoToAppointment(AppointmentDto appointmentDto) {
        return Appointment.builder()
                .date(appointmentDto.getDate())
                .reasonForVisit(appointmentDto.getReasonForVisit())
                .notes(appointmentDto.getNotes())
                .build();
    }
}
