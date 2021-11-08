package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.repo.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class AppointmentService {

    private final AppointmentRepo appointmentRepo;

    @Autowired
    public AppointmentService(AppointmentRepo appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    public List<Appointment> getAppointments() {
        return appointmentRepo.findAll();
    }

    public Appointment getAppointmentById(String id) {
        return appointmentRepo.findById(id).orElseThrow(
                () -> new NoSuchElementException("Appointment with id " + id + " not found!")
        );
    }

    public Appointment addAppointment(AppointmentDto appointmentDto) {

        Appointment appointment = Appointment.builder()
                .doctor(appointmentDto.getDoctor())
                .date(appointmentDto.getDate())
                .reasonForVisit(appointmentDto.getReasonForVisit())
                .notes(appointmentDto.getNotes())
                .build();

            return appointmentRepo.save(appointment);

    }

}
