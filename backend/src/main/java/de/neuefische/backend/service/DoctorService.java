package de.neuefische.backend.service;

import de.neuefische.backend.dto.AppointmentDto;
import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Appointment;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;


@Service
public class DoctorService {

    private final DoctorRepo doctorRepo;
    private final UtilService utilService;

    @Autowired
    public DoctorService(DoctorRepo doctorRepo, UtilService utilService) {
        this.doctorRepo = doctorRepo;
        this.utilService = utilService;
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

        Doctor doctor = utilService.mapDoctorDtoToDoctor(doctorDto);

        Boolean doctorExists = doctorRepo.existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
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
        Appointment appointment = utilService.mapAppointmentDtoToAppointment(appointmentDto);
        Doctor doctor = utilService.mapDoctorDtoToDoctor(doctorDto);

        Boolean appointmentExists = doctorRepo.existsDoctor_Appointment_ByDate(
                appointment.getDate()
        );

        if (appointmentExists) {
            throw new IllegalArgumentException("Appointment with Doctor" + doctorDto.getLastName() + " on " + appointmentDto.getDate() + " already exists in the database");
        } else {
            Doctor doctorToUpdate = doctorRepo.findDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
                    doctor.getFirstName(),
                    doctor.getLastName(),
                    doctor.getSpecialty(),
                    doctor.getCity()
            );

            if (doctorToUpdate != null) {
                doctorToUpdate.getAppointments().add(appointment);
                return doctorRepo.save(doctorToUpdate);
            } else {
                return doctorRepo.save(doctor);
            }
        }

    }

}
