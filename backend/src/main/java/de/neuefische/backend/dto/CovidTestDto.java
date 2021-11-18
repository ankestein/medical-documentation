package de.neuefische.backend.dto;

import de.neuefische.backend.model.Result;
import de.neuefische.backend.model.TestType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CovidTestDto {

    private String id;
    private TestType testType;
    private LocalDateTime dateTime;
    private Result result;

    @Override
    public String toString() {
        return "A COVID test on " +
                this.getDateTime();
    }
}
