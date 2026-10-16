package com.smartrdv.dto;

import lombok.Data;
import lombok.Builder;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
public class CreneauResponse {
    private Long id;
    private LocalDate dateDispo;
    private LocalTime heureDebut;
    private LocalTime heureFin;
    private Integer dureeMinutes;
    private boolean estDisponible;
}