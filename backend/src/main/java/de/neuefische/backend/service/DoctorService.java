package de.neuefische.backend.service;

import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        Boolean doctorExists = doctorRepo.existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
                doctor.getFirstName(),
                doctor.getLastName(),
                doctor.getSpecialty(),
                doctor.getCity()
        );

        if (doctorExists) {
            throw new IllegalArgumentException("Doctor " +
                    doctorDto.getFirstName() + " " +
                    doctorDto.getLastName() + ", " +
                    doctorDto.getSpecialty() + ", " +
                    doctorDto.getCity() +
                    ", already exists in the database");
        } else {
            return doctorRepo.save(doctor);
        }
    }

}
