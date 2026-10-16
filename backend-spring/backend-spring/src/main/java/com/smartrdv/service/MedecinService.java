package com.smartrdv.service;

import com.smartrdv.dto.MedecinResponse;
import com.smartrdv.dto.CreneauResponse;
import com.smartrdv.entity.Medecin;
import com.smartrdv.entity.Creneau;
import com.smartrdv.repository.MedecinRepository;
import com.smartrdv.repository.CreneauRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedecinService {
    
    private final MedecinRepository medecinRepository;
    private final CreneauRepository creneauRepository;
    
    public List<MedecinResponse> searchMedecins(String specialite, String ville, Boolean disponible) {
        return medecinRepository.searchMedecins(specialite, ville, disponible)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public MedecinResponse getMedecinById(Long id) {
        Medecin medecin = medecinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
        return toResponse(medecin);
    }
    
    public List<CreneauResponse> getCreneauxDisponibles(Long medecinId, LocalDate date) {
        Medecin medecin = medecinRepository.findById(medecinId)
                .orElseThrow(() -> new RuntimeException("Médecin non trouvé"));
        
        List<Creneau> creneaux;
        if (date != null) {
            creneaux = creneauRepository.findByMedecinAndDateDispoAndEstDisponibleTrue(medecin, date);
        } else {
            creneaux = creneauRepository.findByMedecinAndEstDisponibleTrue(medecin);
        }
        
        return creneaux.stream()
                .map(this::toCreneauResponse)
                .collect(Collectors.toList());
    }
    
    private MedecinResponse toResponse(Medecin medecin) {
        return MedecinResponse.builder()
                .id(medecin.getId())
                .nom(medecin.getNom())
                .prenom(medecin.getPrenom())
                .specialite(medecin.getSpecialite())
                .ville(medecin.getVille())
                .adresseCabinet(medecin.getAdresseCabinet())
                .notation(medecin.getNotation())
                .nbAvis(medecin.getNbAvis())
                .disponible(medecin.isDisponible())
                .email(medecin.getEmail())
                .telephone(medecin.getTelephone())
                .build();
    }
    
    private CreneauResponse toCreneauResponse(Creneau creneau) {
        return CreneauResponse.builder()
                .id(creneau.getId())
                .dateDispo(creneau.getDateDispo())
                .heureDebut(creneau.getHeureDebut())
                .heureFin(creneau.getHeureFin())
                .dureeMinutes(creneau.getDureeMinutes())
                .estDisponible(creneau.isEstDisponible())
                .build();
    }
}