package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilService {

    public Appointment mapAppointmentDtoToAppointment(AppointmentDto appointmentDto) {
        return Appointment.builder()
                .date(appointmentDto.getDate())
                .reasonForVisit(appointmentDto.getReasonForVisit())
                .notes(appointmentDto.getNotes())
                .build();
    }


    public Doctor mapDoctorDtoToDoctor(DoctorDto doctorDto) {

        AppointmentDto appointmentDto = doctorDto.getAppointmentDto();

        if (appointmentDto != null) {
            Appointment appointment = mapAppointmentDtoToAppointment(appointmentDto);

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
                    .appointments(List.of(appointment))
                    .build();
        } else {
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
    }


}
