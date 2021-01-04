package ies.g25.aLIVE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.User;
import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.Professional;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{
    Page<Patient> findByProfessional(Professional professional, Pageable pageable);

    Page<Patient> findByProfessionalAndCurrentstate(Professional professional, String currentstate, Pageable pageable);

    Page<Patient> findByProfessionalAndFullnameContaining(Professional professional, String name, Pageable pageable);
}
