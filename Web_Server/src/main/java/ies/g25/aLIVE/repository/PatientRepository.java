package ies.g25.aLIVE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.Patient;




@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

    //public List<Patient> findAll();
    //public Patient findPatientbyId(long id);
}