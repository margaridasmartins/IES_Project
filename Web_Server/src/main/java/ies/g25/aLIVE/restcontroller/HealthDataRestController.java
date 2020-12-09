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
import ies.g25.aLIVE.repository.BodyTemperatureRepository;
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

    @Autowired
    public BodyTemperatureRepository bodyTemperatureRepository;

    public HealthDataRestController(PatientRepository patientRepository, HeartRateRepository heartRateRepository,
      SugarLevelRepository sugarLevelRepository,BloodPressureRepository bloodPressureRepository, BodyTemperatureRepository bodyTemperatureRepository) {
        this.patientRepository=patientRepository;
        this.heartRateRepository=heartRateRepository;
        this.sugarLevelRepository=sugarLevelRepository;
        this.bloodPressureRepository=bloodPressureRepository;
        this.bodyTemperatureRepository= bodyTemperatureRepository;
    }

    @GetMapping("/sugarlevel")
    @ResponseBody
    public List<SugarLevel> getAllSugarLevels() {
        return sugarLevelRepository.findAll();
    }

    @GetMapping("/sugarlevel/{pid}")
    @ResponseBody
    public List<SugarLevel> getSugarLevel(@PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        return sugarLevelRepository.findByPatient(op.get());
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

    @GetMapping("/heartrate/{pid}")
    @ResponseBody
    public List<HeartRate> getHeartRate(@PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        return heartRateRepository.findByPatient(op.get());
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

    @GetMapping("/bloodpressure/{pid}")
    @ResponseBody
    public List<BloodPressure> getBloodPressure(@PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        return bloodPressureRepository.findByPatient(op.get());
    }

    @PostMapping("/bloodpressure/{pid}")
    public BloodPressure createBloodPressure(@Valid @RequestBody BloodPressure bp, @PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        bp.setPatient(op.get());
        return bloodPressureRepository.save(bp);
    }


    @GetMapping("/bodytemperature")
    @ResponseBody
    public List<BodyTemperature> getAllBodyTemperature() {
        return bodyTemperatureRepository.findAll();
    }

    @GetMapping("/bodytemperature/{pid}")
    @ResponseBody
    public List<BodyTemperature> getBodyTemperature(@PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        return bodyTemperatureRepository.findByPatient(op.get());
    }

    @PostMapping("/bodytemperature/{pid}")
    public BodyTemperature createBloodPressure(@Valid @RequestBody BodyTemperature bt, @PathVariable(value = "pid") long pid) {
        Optional<Patient> op=patientRepository.findById(pid);
        bt.setPatient(op.get());
        return bodyTemperatureRepository.save(bt);
    }
    

}