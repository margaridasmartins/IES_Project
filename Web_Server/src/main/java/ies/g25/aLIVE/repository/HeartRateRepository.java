package ies.g25.aLIVE.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import ies.g25.aLIVE.model.*;


@Repository
public interface HeartRateRepository extends JpaRepository<HeartRate, Long>{

    @Query("select b from HeartRate b where b.date > :cdate and patient.id=:patientID")
    List<HeartRate> findByPatientLessThanMonth(@Param("cdate") LocalDateTime cdate, @Param("patientID") Long id);

    List<HeartRate> findByPatient(Patient p);
}