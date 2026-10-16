package com.smartrdv.repository;

import com.smartrdv.entity.Creneau;
import com.smartrdv.entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface CreneauRepository extends JpaRepository<Creneau, Long> {
    List<Creneau> findByMedecinAndDateDispoAndEstDisponibleTrue(Medecin medecin, LocalDate date);
    List<Creneau> findByMedecinAndEstDisponibleTrue(Medecin medecin);
}