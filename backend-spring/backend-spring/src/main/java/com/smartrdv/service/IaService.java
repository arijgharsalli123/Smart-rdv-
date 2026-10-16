package com.smartrdv.service;

import com.smartrdv.dto.IaScoreRequest;
import com.smartrdv.dto.IaScoreResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class IaService {

    @Value("${ia.service.url:http://localhost:8000}")
    private String iaServiceUrl;

    private final RestTemplate restTemplate;

    /**
     * Calcule le score de priorité via le service IA
     */
    public IaScoreResponse calculatePriority(IaScoreRequest request) {
        try {
            String url = iaServiceUrl + "/api/ia/score";
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<IaScoreRequest> entity = new HttpEntity<>(request, headers);
            
            ResponseEntity<IaScoreResponse> response = restTemplate.postForEntity(
                url, 
                entity, 
                IaScoreResponse.class
            );
            
            log.info("Score IA calculé: priority={}, score={}", 
                response.getBody().getPriority(), 
                response.getBody().getScore());
            
            return response.getBody();
            
        } catch (RestClientException e) {
            log.error("Erreur de connexion au service IA: {}", e.getMessage());
            // Fallback : score par défaut si l'IA ne répond pas
            return IaScoreResponse.builder()
                    .priority("modere")
                    .score(50)
                    .confidence(0.5)
                    .recommendation("Score par défaut - IA indisponible")
                    .savedToDb(false)
                    .build();
        }
    }
    
    /**
     * Version simplifiée avec les symptômes directement
     */
    public IaScoreResponse calculatePriorityFromSymptoms(
            boolean fever, 
            int painLevel, 
            boolean difficultyBreathing,
            int age,
            int durationDays) {
        
        Map<String, Object> symptoms = new HashMap<>();
        symptoms.put("fever", fever);
        symptoms.put("pain_level", painLevel);
        symptoms.put("difficulty_breathing", difficultyBreathing);
        symptoms.put("age", age);
        symptoms.put("duration_days", durationDays);
        
        IaScoreRequest request = IaScoreRequest.builder()
                .symptoms(symptoms)
                .build();
        
        return calculatePriority(request);
    }
}