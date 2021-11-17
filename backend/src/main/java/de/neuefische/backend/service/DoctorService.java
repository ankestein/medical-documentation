package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.mapper.AppointmentMapper;
import de.neuefische.backend.mapper.DoctorMapper;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;


@Service
public class DoctorService {

    private final DoctorRepo doctorRepo;

    @Autowired
    public DoctorService(DoctorRepo doctorRepo) {
        this.doctorRepo = doctorRepo;
    }

    public List<Doctor> getDoctors() {
        return doctorRepo.findAll();
    }

    public Doctor getDoctorById(String id) {
        return doctorRepo.findById(id).orElseThrow(
                () -> new NoSuchElementException("Doctor with id " + id + " not found!")
        );
    }

    public Doctor addDoctor(DoctorDto doctorDto) {

        Doctor doctor = DoctorMapper.mapDoctorDtoToDoctor(doctorDto);

        boolean doctorExists = doctorRepo.existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialty(),
                doctor.getCity()
        );

        if (doctorExists) {
            throw new IllegalArgumentException(doctorDto + ", already exists in the database");
        } else {
            return doctorRepo.save(doctor);
        }
    }


    public Doctor addAppointment(AppointmentDto appointmentDto, String doctorId) {

        Appointment appointment = AppointmentMapper.mapAppointmentDtoToAppointment(appointmentDto);
        appointment.setId(IdService.generateId());

        Doctor doctorToUpdate = getDoctorById(doctorId);
        checkIfAppointmentExists(doctorToUpdate, appointmentDto);

        List<Appointment> appointments = new ArrayList<>();
        if (doctorToUpdate.getAppointments() != null) {
            appointments.addAll(doctorToUpdate.getAppointments());
        }
        appointments.add(appointment);
        doctorToUpdate.setAppointments(appointments);
        return doctorRepo.save(doctorToUpdate);
    }


    public void checkIfAppointmentExists(Doctor doctorToUpdate, AppointmentDto appointmentDto) {
        if (doctorToUpdate.getAppointments() != null) {
            boolean appointmentExists = doctorToUpdate
                    .getAppointments()
                    .stream()
                    .anyMatch(
                            element -> element.getDate().equals(appointmentDto.getDate())
                    );

            if (appointmentExists) {
                throw new IllegalArgumentException("Appointment with Doctor " + doctorToUpdate.getLastName() + " on " + appointmentDto.getDate() + " already exists in the database");
            }
        }

    }
}