package com.smartrdv.controller;

import com.smartrdv.dto.PatientProfileResponse;
import com.smartrdv.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
@Tag(name = "Patients", description = "Gestion des profils patients")
public class PatientController {
    
    private final PatientService patientService;
    
    @GetMapping("/{id}")
    @Operation(summary = "Profil d'un patient")
    public ResponseEntity<PatientProfileResponse> getPatientProfile(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientProfile(id));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Modifier le profil d'un patient")
    public ResponseEntity<PatientProfileResponse> updatePatientProfile(
            @PathVariable Long id,
            @RequestBody PatientProfileResponse request) {
        return ResponseEntity.ok(patientService.updatePatientProfile(id, request));
    }
}
