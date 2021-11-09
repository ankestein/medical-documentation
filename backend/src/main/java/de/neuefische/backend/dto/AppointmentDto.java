package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AppointmentDto {

    private String date;
    private String reasonForVisit;
    private String notes;

}