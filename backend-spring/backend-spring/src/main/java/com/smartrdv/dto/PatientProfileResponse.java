package com.smartrdv.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class PatientProfileResponse {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private Integer age;
    private String allergies;
    private String antecedents;
    private String groupeSanguin;
}