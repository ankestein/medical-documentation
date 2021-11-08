package de.neuefische.backend.dto;

import de.neuefische.backend.model.Doctor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AppointmentDto {

    private Doctor doctor;
    private Date date;
    private String reasonForVisit;
    private String notes;

}