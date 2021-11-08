package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "appointments")
@Builder
public class Appointment {

    private String id;
    private Doctor doctor;
    private Date date;
    private String reasonForVisit;
    private String notes;

}