package de.neuefische.backend.dto;

import lombok.*;


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
    private AppointmentDto appointmentDto;

    @Override
    public String toString() {
        return "Doctor " +
                this.getFirstName() + " " +
                this.getLastName() + ", " +
                this.getSpecialty() + ", " +
                this.getCity();
    }

}
