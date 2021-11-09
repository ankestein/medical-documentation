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
    private final UtilService utilService;

    @Autowired
    public AppointmentService(AppointmentRepo appointmentRepo, UtilService utilService) {
        this.appointmentRepo = appointmentRepo;
        this.utilService = utilService;
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

        Appointment appointment = utilService.mapAppointmentDtoToAppointment(appointmentDto);

        Boolean appointmentExists = appointmentRepo.existsAppointmentByDoctorIdAndDate(
                appointment.getDoctorId(),
                appointment.getDate()
        );

        if (appointmentExists) {
            throw new IllegalArgumentException(appointmentDto + " already exists in the database");
        } else {
            return appointmentRepo.save(appointment);
        }

    }

}
