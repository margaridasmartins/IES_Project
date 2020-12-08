package ies.g25.aLIVE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.User;
import ies.g25.aLIVE.model.Patient;
import java.util.List;

import org.springframework.data.jpa.repository.Query;



@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

    public List<Patient> findAll();

    @Query(value = "SELECT username FROM Patient WHERE id=?1") 
    public Patient findById(long id);
}