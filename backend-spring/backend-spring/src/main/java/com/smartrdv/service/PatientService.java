package com.smartrdv.service;

import com.smartrdv.dto.PatientProfileResponse;
import com.smartrdv.entity.Patient;
import com.smartrdv.repository.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PatientService {
    
    private final UtilisateurRepository utilisateurRepository;
    
    public PatientProfileResponse getPatientProfile(Long id) {
        Patient patient = (Patient) utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
        
        return PatientProfileResponse.builder()
                .id(patient.getId())
                .nom(patient.getNom())
                .prenom(patient.getPrenom())
                .email(patient.getEmail())
                .telephone(patient.getTelephone())
                .age(patient.getAge())
                .allergies(patient.getAllergies())
                .antecedents(patient.getAntecedents())
                .groupeSanguin(patient.getGroupeSanguin())
                .build();
    }
    
    @Transactional
    public PatientProfileResponse updatePatientProfile(Long id, PatientProfileResponse request) {
        Patient patient = (Patient) utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient non trouvé"));
        
        patient.setTelephone(request.getTelephone());
        patient.setAge(request.getAge());
        patient.setAllergies(request.getAllergies());
        patient.setAntecedents(request.getAntecedents());
        patient.setGroupeSanguin(request.getGroupeSanguin());
        
        utilisateurRepository.save(patient);
        return getPatientProfile(id);
    }
}