package de.neuefische.backend.mapper;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;

import java.util.List;


public class DoctorMapper {

    private DoctorMapper() {}

    public static Doctor mapDoctorDtoToDoctor(DoctorDto doctorDto) {

        AppointmentDto appointmentDto = doctorDto.getAppointmentDto();

        Doctor doctor = Doctor.builder()
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

        if (appointmentDto != null) {
            Appointment appointment = AppointmentMapper.mapAppointmentDtoToAppointment(appointmentDto);
            doctor.setAppointments(List.of(appointment));
        }

        return doctor;
    }
}