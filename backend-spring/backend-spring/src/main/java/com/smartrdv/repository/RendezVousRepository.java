package com.smartrdv.repository;

import com.smartrdv.entity.RendezVous;
import com.smartrdv.entity.Patient;
import com.smartrdv.entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface RendezVousRepository extends JpaRepository<RendezVous, Long> {
    List<RendezVous> findByPatient(Patient patient);
    List<RendezVous> findByMedecin(Medecin medecin);
    List<RendezVous> findByMedecinAndDateRdv(Medecin medecin, LocalDate date);
    boolean existsByCreneauId(Long creneauId);
}