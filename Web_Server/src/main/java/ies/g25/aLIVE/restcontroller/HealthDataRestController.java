package ies.g25.aLIVE.restcontroller;

import java.lang.StackWalker.Option;
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

import ies.g25.aLIVE.model.*;
import ies.g25.aLIVE.repository.BloodPressureRepository;
import ies.g25.aLIVE.repository.HeartRateRepository;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.SugarLevelRepository;

@RestController                                             
@RequestMapping("/api/data") 
public class HealthDataRestController{
    //get users, get health info from a user
    @Autowired
    public PatientRepository patientRepository;

    @Autowired
    public HeartRateRepository heartRateRepository;

    @Autowired
    public SugarLevelRepository sugarLevelRepository;

    @Autowired
    public BloodPressureRepository bloodPressureRepository;

    public HealthDataRestController(PatientRepository patientRepository, HeartRateRepository heartRateRepository,
      SugarLevelRepository sugarLevelRepository,BloodPressureRepository bloodPressureRepository) {
        this.patientRepository=patientRepository;
        this.heartRateRepository=heartRateRepository;
        this.sugarLevelRepository=sugarLevelRepository;
        this.bloodPressureRepository=bloodPressureRepository;
    }

    @GetMapping("/sugarlevel")
    @ResponseBody
    public List<SugarLevel> getAllSugarLevels() {
        return sugarLevelRepository.findAll();
    }

    @PostMapping("/sugarlevel/{pid}")
    public SugarLevel createSugarLevel(@PathVariable(value = "pid") long pid, @Valid @RequestBody SugarLevel sl) {
        Optional<Patient> op=patientRepository.findById(pid);
        sl.setPatient(op.get());
        return sugarLevelRepository.save(sl);
    }

    @GetMapping("/heartrate")
    @ResponseBody
    public List<HeartRate> getAllHeartRates() {
        return heartRateRepository.findAll();
    }

    @PostMapping("/heartrate/{pid}")
    public HeartRate createHeartRate( @PathVariable(value = "pid") long pid, @Valid @RequestBody HeartRate hr) {
        Optional<Patient> op=patientRepository.findById(pid);
        hr.setPatient(op.get());
        return heartRateRepository.save(hr);
    }

    @GetMapping("/bloodpressure")
    @ResponseBody
    public List<BloodPressure> getAllBloodPressures() {
        return bloodPressureRepository.findAll();
    }

    @PostMapping("/bloodpressure/{pid}")
    public BloodPressure createBloodPressure(@Valid @RequestBody BloodPressure bp, @PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        bp.setPatient(op.get());
        return bloodPressureRepository.save(bp);
    }
    

}