package com.smartrdv.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.math.BigDecimal;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Medecin extends Utilisateur {
    private String specialite;
    private String ville;
    private String adresseCabinet;
    private BigDecimal notation = BigDecimal.ZERO;
    private Integer nbAvis = 0;
    private boolean disponible = true;
}