package ies.g25.aLIVE.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.BloodPressure;
import ies.g25.aLIVE.model.Patient;



@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long>{

    @Query("select b from BloodPressure b where b.date > :cdate and patient.id=:patientID")
    List<BloodPressure> findByPatientLessThanMonth(@Param("cdate") LocalDateTime cdate, @Param("patientID") Long id);

    List<BloodPressure> findByPatient(Patient p);

    BloodPressure findFirstByPatient(Patient p, Sort sort);
}
