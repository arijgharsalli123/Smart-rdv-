package com.smartrdv.dto;

import lombok.Data;
import lombok.Builder;
import java.math.BigDecimal;

@Data
@Builder
public class MedecinResponse {
    private Long id;
    private String nom;
    private String prenom;
    private String specialite;
    private String ville;
    private String adresseCabinet;
    private BigDecimal notation;
    private Integer nbAvis;
    private boolean disponible;
    private String email;
    private String telephone;
}