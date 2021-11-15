package de.neuefische.backend.repo;

import de.neuefische.backend.model.Doctor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorRepo extends PagingAndSortingRepository<Doctor, String> {

    List<Doctor> findAll();

    Doctor findDoctorById(
            String id
    );

    Boolean existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
            String firstName,
            String lastName,
            String specialty,
            String city);

    Boolean existsDoctorByIdAndAppointmentsDate(
            String id,
            LocalDate date);

}
