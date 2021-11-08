package de.neuefische.backend.repo;

import de.neuefische.backend.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Stream;

@Repository
public interface DoctorRepo extends MongoRepository<Doctor, String> {

    /*List<Doctor> findAll();*/
/*
    boolean existsDoctorByFirstNameAndLastNameAndSpecialtyAnd_Address_City(
            String firstName,
            String lastName,
            String specialty,
            String city);
 */
/*
    @Query
    Doctor findDoctorById(String id);

 */

    @Query(value = "{$and: {firstName : ?0, lastName : ?0, specialty : ?0, city : ?0}, exists = true")
    Boolean existsDoctorByFirstNameAndLastNameAndSpecialtyAndCity(
            String firstName,
            String lastName,
            String specialty,
            String city);


}
