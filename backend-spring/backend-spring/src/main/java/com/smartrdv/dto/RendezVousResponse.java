package com.smartrdv.dto;

import lombok.Data;
import lombok.Builder;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class RendezVousResponse {
    private Long id;
    private Long patientId;
    private String patientNom;
    private String patientPrenom;
    private Long medecinId;
    private String medecinNom;
    private String medecinPrenom;
    private String medecinSpecialite;
    private LocalDate dateRdv;
    private LocalTime heure;
    private String statut;
    private String scorePriorite;
    private String motif;
}