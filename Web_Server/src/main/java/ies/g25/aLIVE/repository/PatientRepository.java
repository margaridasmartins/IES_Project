package ies.g25.aLIVE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.User;
import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.Professional;

import java.util.List;

import org.springframework.data.jpa.repository.Query;



@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{
    List<Patient> findByProfessional(Professional professional );
}
