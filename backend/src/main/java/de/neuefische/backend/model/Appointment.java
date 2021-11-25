package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Appointment {

    private String id;
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