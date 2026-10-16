package com.smartrdv.controller;

import com.smartrdv.dto.MedecinResponse;
import com.smartrdv.dto.CreneauResponse;
import com.smartrdv.service.MedecinService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/medecins")
@RequiredArgsConstructor
@Tag(name = "Médecins", description = "Gestion des médecins et créneaux")
public class MedecinController {
    
    private final MedecinService medecinService;
    
    @GetMapping
    @Operation(summary = "Rechercher des médecins avec filtres")
    public ResponseEntity<List<MedecinResponse>> searchMedecins(
            @RequestParam(required = false) String specialite,
            @RequestParam(required = false) String ville,
            @RequestParam(required = false) Boolean disponible) {
        return ResponseEntity.ok(medecinService.searchMedecins(specialite, ville, disponible));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Détails d'un médecin")
    public ResponseEntity<MedecinResponse> getMedecin(@PathVariable Long id) {
        return ResponseEntity.ok(medecinService.getMedecinById(id));
    }
    
    @GetMapping("/{id}/creneaux")
    @Operation(summary = "Créneaux disponibles d'un médecin")
    public ResponseEntity<List<CreneauResponse>> getCreneaux(
            @PathVariable Long id,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(medecinService.getCreneauxDisponibles(id, date));
    }
}