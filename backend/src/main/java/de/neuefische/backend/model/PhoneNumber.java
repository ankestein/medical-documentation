package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PhoneNumber {
    private String countryCode;
    private String areaCode;
    private String numberSuffix;
    private PhoneType phoneType;
}
