package de.neuefische.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AppointmentDto {

    private LocalDate date;
    private String reasonForVisit;
    private String notes;

}