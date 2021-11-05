package de.neuefische.backend.service;

import de.neuefische.backend.dto.DoctorDto;
import de.neuefische.backend.model.Address;
import de.neuefische.backend.model.Doctor;
import de.neuefische.backend.repo.DoctorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
        Optional<Doctor> optionalDoctor = doctorRepo.findById(id);
        if (optionalDoctor.isEmpty()) {
            throw new NoSuchElementException ("Doctor with id " + id + " not found!");
        }
        return optionalDoctor.get();
    }

    public Doctor addDoctor(DoctorDto doctorDto) {

        Doctor doctor = new Doctor();
        Address address = new Address();

        address.setStreet(doctorDto.getAddress().getStreet());
        address.setStreetNumber(doctorDto.getAddress().getStreetNumber());
        address.setPostalCode(doctorDto.getAddress().getPostalCode());
        address.setCity(doctorDto.getAddress().getCity());

        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setSpecialty(doctorDto.getSpecialty());
        doctor.setAddress(address);
        doctor.setPhoneNumbers(doctorDto.getPhoneNumbers());
        doctor.setEmailAddress(doctorDto.getEmailAddress());
        return doctorRepo.save(doctor);

    }


}
