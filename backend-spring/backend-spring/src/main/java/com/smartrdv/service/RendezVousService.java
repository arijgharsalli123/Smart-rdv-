package com.smartrdv.service;

import com.smartrdv.dto.IaScoreResponse;
import com.smartrdv.dto.RendezVousRequest;
import com.smartrdv.dto.RendezVousResponse;
import com.smartrdv.entity.*;
import com.smartrdv.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RendezVousService {
    
    private final RendezVousRepository rendezVousRepository;
    private final UtilisateurRepository utilisateurRepository;
    private final MedecinRepository medecinRepository;
    private final CreneauRepository creneauRepository;
    private final IaService iaService;  // Injection du service IA
    
    @Transactional
    public RendezVousResponse createRendezVous(RendezVousRequest request) {
        // Vérifier si le créneau est déjà pris
        if (rendezVousRepository.existsByCreneauId(request.getCreneauId())) {
            throw new RuntimeException("Ce créneau n'est plus disponible");
        }
        
        Patient patient = (Patient) utilisateurRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
        
        Medecin medecin = medecinRepository.findById(request.getMedecinId())
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
        
        Creneau creneau = creneauRepository.findById(request.getCreneauId())
                .orElseThrow(() -> new RuntimeException("Créneau non trouvé"));
        
        // Marquer le créneau comme indisponible
        creneau.setEstDisponible(false);
        creneauRepository.save(creneau);
        
        // Appel au service IA pour calculer la priorité
        IaScoreResponse iaResponse = calculatePriorityFromPatient(patient, request.getMotif());
        
        // Créer le rendez-vous
        RendezVous rdv = new RendezVous();
        rdv.setPatient(patient);
        rdv.setMedecin(medecin);
        rdv.setCreneau(creneau);
        rdv.setDateRdv(creneau.getDateDispo());
        rdv.setHeure(creneau.getHeureDebut());
        rdv.setMotif(request.getMotif());
        rdv.setCreatedAt(LocalDateTime.now());
        rdv.setScorePriorite(iaResponse.getPriority());
        
        RendezVous saved = rendezVousRepository.save(rdv);
        
        log.info("Rendez-vous créé avec priorité: {}", iaResponse.getPriority());
        
        return toResponse(saved);
    }
    
    /**
     * Calcule la priorité à partir des données du patient
     */
    private IaScoreResponse calculatePriorityFromPatient(Patient patient, String motif) {
        // Construction des symptômes basée sur le profil du patient
        Map<String, Object> symptoms = new HashMap<>();
        symptoms.put("fever", false); // Par défaut, à remplacer par des données réelles
        symptoms.put("pain_level", 0);
        symptoms.put("difficulty_breathing", false);
        symptoms.put("age", patient.getAge() != null ? patient.getAge() : 30);
        symptoms.put("duration_days", 1);
        
        // Analyse du motif pour extraire des informations
        if (motif != null) {
            String motifLower = motif.toLowerCase();
            if (motifLower.contains("fièvre") || motifLower.contains("fievre")) {
                symptoms.put("fever", true);
                symptoms.put("pain_level", Math.max(5, (int)symptoms.get("pain_level")));
            }
            if (motifLower.contains("douleur")) {
                symptoms.put("pain_level", 7);
            }
            if (motifLower.contains("respiratoire") || motifLower.contains("souffle")) {
                symptoms.put("difficulty_breathing", true);
            }
        }
        
        com.smartrdv.dto.IaScoreRequest request = com.smartrdv.dto.IaScoreRequest.builder()
                .symptoms(symptoms)
                .build();
        
        return iaService.calculatePriority(request);
    }
    
    // Le reste des méthodes reste identique...
    public List<RendezVousResponse> getRendezVousByPatient(Long patientId) {
        Patient patient = (Patient) utilisateurRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
        
        return rendezVousRepository.findByPatient(patient)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public List<RendezVousResponse> getRendezVousByMedecin(Long medecinId) {
        Medecin medecin = medecinRepository.findById(medecinId)
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
        
        return rendezVousRepository.findByMedecin(medecin)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public RendezVousResponse updateStatut(Long rdvId, String statut) {
        RendezVous rdv = rendezVousRepository.findById(rdvId)
                .orElseThrow(() -> new RuntimeException("Rendez-vous non trouvé"));
        
        rdv.setStatut(RendezVous.Statut.valueOf(statut));
        RendezVous updated = rendezVousRepository.save(rdv);
        return toResponse(updated);
    }
    
    private RendezVousResponse toResponse(RendezVous rdv) {
        return RendezVousResponse.builder()
                .id(rdv.getId())
                .patientId(rdv.getPatient().getId())
                .patientNom(rdv.getPatient().getNom())
                .patientPrenom(rdv.getPatient().getPrenom())
                .medecinId(rdv.getMedecin().getId())
                .medecinNom(rdv.getMedecin().getNom())
                .medecinPrenom(rdv.getMedecin().getPrenom())
                .medecinSpecialite(rdv.getMedecin().getSpecialite())
                .dateRdv(rdv.getDateRdv())
                .heure(rdv.getHeure())
                .statut(rdv.getStatut().toString())
                .scorePriorite(rdv.getScorePriorite())
                .motif(rdv.getMotif())
                .build();
    }
}