package de.neuefische.backend.dto;

import de.neuefische.backend.model.ImagingType;
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
    private String reminder;
    private String notes;
    private String examination;
    private String doctorsReply;
    private String medication;
    private ImagingType imagingType;
    private String bloodSampling;
}