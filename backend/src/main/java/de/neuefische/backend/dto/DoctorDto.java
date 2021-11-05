package de.neuefische.backend.dto;

import de.neuefische.backend.model.Address;
import de.neuefische.backend.model.PhoneNumber;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DoctorDto {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String specialty;
    private Address address;
    private List<PhoneNumber> phoneNumbers;
    private String emailAddress;
}
