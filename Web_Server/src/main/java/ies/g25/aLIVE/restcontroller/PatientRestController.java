package ies.g25.aLIVE.restcontroller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.g25.aLIVE.repository.*;
import ies.g25.aLIVE.model.*;

@RestController                                             
@RequestMapping("/api/users") 
public class PatientRestController{
    //get users, get health info from a user
    
    public PatientRepository patientRepository;
    public HeartRateRepository heartRateRepository;
    public SugarLevelRepository sugarLevelRepository;
    public BloodPressureRepository bloodPressureRepository;

    public PatientRestController(PatientRepository patientRepository,HeartRateRepository heartRateRepository,
      SugarLevelRepository sugarLevelRepository,BloodPressureRepository bloodPressureRepository) {
        this.patientRepository=patientRepository;
        this.heartRateRepository=heartRateRepository;
        this.sugarLevelRepository=sugarLevelRepository;
        this.bloodPressureRepository=bloodPressureRepository;
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return this.patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Patient getPatient(@PathVariable(value = "id") long patientId) {
        return this.patientRepository.findPatientbyId(patientId);
    }

}