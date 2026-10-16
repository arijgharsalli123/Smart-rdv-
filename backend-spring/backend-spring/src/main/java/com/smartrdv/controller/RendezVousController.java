package com.smartrdv.controller;

import com.smartrdv.dto.RendezVousRequest;
import com.smartrdv.dto.RendezVousResponse;
import com.smartrdv.service.RendezVousService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rdv")
@RequiredArgsConstructor
@Tag(name = "Rendez-vous", description = "Gestion des rendez-vous")
public class RendezVousController {
    
    private final RendezVousService rendezVousService;
    
    @PostMapping
    @Operation(summary = "Créer un rendez-vous")
    public ResponseEntity<RendezVousResponse> createRendezVous(@RequestBody RendezVousRequest request) {
        return ResponseEntity.ok(rendezVousService.createRendezVous(request));
    }
    
    @GetMapping("/patient/{patientId}")
    @Operation(summary = "Liste des rendez-vous d'un patient")
    public ResponseEntity<List<RendezVousResponse>> getRendezVousByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(rendezVousService.getRendezVousByPatient(patientId));
    }
    
    @GetMapping("/medecin/{medecinId}")
    @Operation(summary = "Liste des rendez-vous d'un médecin")
    public ResponseEntity<List<RendezVousResponse>> getRendezVousByMedecin(@PathVariable Long medecinId) {
        return ResponseEntity.ok(rendezVousService.getRendezVousByMedecin(medecinId));
    }
    
    @PutMapping("/{id}/statut")
    @Operation(summary = "Modifier le statut d'un rendez-vous")
    public ResponseEntity<RendezVousResponse> updateStatut(
            @PathVariable Long id,
            @RequestParam String statut) {
        return ResponseEntity.ok(rendezVousService.updateStatut(id, statut));
    }
}