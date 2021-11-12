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


    public Doctor addAppointment(DoctorDto doctorDto) {

        AppointmentDto appointmentDto = doctorDto.getAppointmentDto();
        Appointment appointment = AppointmentMapper.mapAppointmentDtoToAppointment(appointmentDto);
        appointment.setId(IdService.generateId());
        Doctor doctor = DoctorMapper.mapDoctorDtoToDoctor(doctorDto);
        doctor.setAppointments(List.of(appointment));

        Doctor doctorToUpdate = doctorRepo.findDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialty(),
                doctor.getCity()
        );
        if (doctorToUpdate != null) {
            doctor.setId(doctorToUpdate.getId());
        }

        boolean appointmentExists = doctorRepo.existsDoctorByIdAndAppointmentsDate(
                doctor.getId(),
                appointment.getDate()
        );

        if (appointmentExists) {
            throw new IllegalArgumentException("Appointment with Doctor " + doctorDto.getLastName() + " on " + appointmentDto.getDate() + " already exists in the database");
        } else {
            if (doctorToUpdate != null) {
                if (doctorToUpdate.getAppointments() != null) {
                    List<Appointment> appointments = new ArrayList<>(doctorToUpdate.getAppointments());
                    appointments.add(appointment);
                    doctorToUpdate.setAppointments(appointments);
                } else {
                    List<Appointment> appointments = new ArrayList<>(List.of(appointment));
                    doctorToUpdate.setAppointments(appointments);
                }
                return doctorRepo.save(doctorToUpdate);
            } else {
                return doctorRepo.save(doctor);
            }
        }
    }

}
