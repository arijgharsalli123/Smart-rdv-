package com.smartrdv.controller;

import com.smartrdv.dto.IaScoreRequest;
import com.smartrdv.dto.IaScoreResponse;
import com.smartrdv.service.IaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ia")
@RequiredArgsConstructor
@Tag(name = "IA Test", description = "Test de connexion avec le service IA")
public class IaTestController {
    
    private final IaService iaService;
    
    @PostMapping("/test-score")
    @Operation(summary = "Tester le calcul de priorité IA")
    public ResponseEntity<IaScoreResponse> testScore(@RequestBody Map<String, Object> symptoms) {
        IaScoreRequest request = IaScoreRequest.builder()
                .symptoms(symptoms)
                .build();
        return ResponseEntity.ok(iaService.calculatePriority(request));
    }
    
    @GetMapping("/health")
    @Operation(summary = "Vérifier la connexion avec le service IA")
    public ResponseEntity<String> health() {
        try {
            // Test simple pour vérifier que le service IA répond
            Map<String, Object> testSymptoms = Map.of(
                "fever", true,
                "pain_level", 8,
                "difficulty_breathing", false,
                "age", 45,
                "duration_days", 2
            );
            IaScoreRequest request = IaScoreRequest.builder().symptoms(testSymptoms).build();
            IaScoreResponse response = iaService.calculatePriority(request);
            return ResponseEntity.ok("Service IA connecté - Priorité: " + response.getPriority());
        } catch (Exception e) {
            return ResponseEntity.status(503).body("Service IA indisponible: " + e.getMessage());
        }
    }
}