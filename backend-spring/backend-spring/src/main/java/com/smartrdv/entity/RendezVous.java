package com.smartrdv.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class RendezVous {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "medecin_id", nullable = false)
    private Medecin medecin;
    
    @OneToOne
    @JoinColumn(name = "creneau_id")
    private Creneau creneau;
    
    private LocalDate dateRdv;
    
    private LocalTime heure;
    
    @Enumerated(EnumType.STRING)
    private Statut statut = Statut.EN_ATTENTE;
    
    private String scorePriorite;
    
    @Column(columnDefinition = "TEXT")
    private String motif;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    public enum Statut {
        EN_ATTENTE, CONFIRME, ANNULE, TERMINE
    }
}