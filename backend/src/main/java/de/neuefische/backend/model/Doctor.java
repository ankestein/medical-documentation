package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "doctors")
@Builder
public class Doctor {

    private String id;
    private String firstName;
    private String lastName;
    private String specialty;
    private String street;
    private String streetNumber;
    private String postalCode;
    private String city;
    private String country;
    private String phoneNumber;
    private String mobileNumber;
    private String emailAddress;
}
