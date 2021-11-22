package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "covid-tests")
@Builder
public class CovidTest {

    private String id;
    private TestType testType;
    private LocalDateTime dateTime;
    private Result result;


}
