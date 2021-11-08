package de.neuefische.backend.repo;

import de.neuefische.backend.model.Appointment;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepo extends PagingAndSortingRepository<Appointment, String> {

    List<Appointment> findAll();

    // TODO compare only doctor.id
    /*
    Boolean existsAppointmentByDoctorAndDate(
            Doctor doctor,
            String date
    );
     */

}
