package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

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
    private Address address;
    private List<PhoneNumber> phoneNumbers;
    private String mobileNumber;
    private String emailAddress;
}
