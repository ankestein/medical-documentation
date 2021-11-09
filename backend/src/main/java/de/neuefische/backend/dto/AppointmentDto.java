package de.neuefische.backend.dto;

import de.neuefische.backend.model.Doctor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AppointmentDto {

    private String doctorId;
    private String date;
    private String reasonForVisit;
    private String notes;

    @Override
    public String toString() {
        return "Appointment with doctor " +
                this.getDoctorId() + " on " +
                this.getDate();
    }
}