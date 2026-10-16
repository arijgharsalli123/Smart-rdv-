package com.smartrdv.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RendezVousRequest {
    private Long patientId;
    private Long medecinId;
    private Long creneauId;
    private String motif;
    private LocalDate dateRdv;
    private LocalTime heure;
}