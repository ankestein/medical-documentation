package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DoctorDto {

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
