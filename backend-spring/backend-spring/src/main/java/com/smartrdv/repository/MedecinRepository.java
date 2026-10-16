package com.smartrdv.repository;

import com.smartrdv.entity.Medecin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MedecinRepository extends JpaRepository<Medecin, Long> {
    
    @Query("SELECT m FROM Medecin m WHERE " +
           "(:specialite IS NULL OR m.specialite = :specialite) AND " +
           "(:ville IS NULL OR m.ville = :ville) AND " +
           "(:disponible IS NULL OR m.disponible = :disponible)")
    List<Medecin> searchMedecins(@Param("specialite") String specialite,
                                  @Param("ville") String ville,
                                  @Param("disponible") Boolean disponible);
    
    List<Medecin> findBySpecialiteContainingIgnoreCase(String specialite);
    List<Medecin> findByVilleContainingIgnoreCase(String ville);
}