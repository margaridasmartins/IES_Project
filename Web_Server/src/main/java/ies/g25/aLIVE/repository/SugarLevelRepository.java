package ies.g25.aLIVE.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.SugarLevel;


@Repository
public interface SugarLevelRepository extends JpaRepository<SugarLevel, Long>{

    @Query("select b from SugarLevel b where b.date > :cdate and patient.id=:patientID")
    List<SugarLevel> findByPatientLessThanMonth(@Param("cdate") LocalDateTime cdate, @Param("patientID") Long id);

    List<SugarLevel> findByPatient(Patient p);

    SugarLevel findFirstByPatient(Patient p, Sort sort);
}