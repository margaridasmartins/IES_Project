package ies.g25.aLIVE.restcontroller;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.User;
import ies.g25.aLIVE.repository.BloodPressureRepository;
import ies.g25.aLIVE.repository.HeartRateRepository;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.SugarLevelRepository;

@RestController                                             
@RequestMapping("/api/users") 
public class PatientRestController{
    //get users, get health info from a user
    
    @Autowired
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
    @ResponseBody
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @PostMapping
    public Patient createPatient(@Valid @RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable(value = "id") Long patientId) {
        Optional<Patient> op=  patientRepository.findById(patientId);
        Patient p = op.get();
        return ResponseEntity.ok().body(u);
    }

    @GetMapping("/status/{id}")
    public ResponseEntity<Patient> getLastDataById(@PathVariable(value = "id") Long patientId) {
        Optional<Patient> op=  patientRepository.findById(patientId);
        Patient p = op.get();
        return ResponseEntity.ok().body(u);
    }

}