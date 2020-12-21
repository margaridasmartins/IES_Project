package ies.g25.aLIVE.restcontroller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import ies.g25.aLIVE.exception.ResourceNotFoundException;
import ies.g25.aLIVE.model.BloodPressure;
import ies.g25.aLIVE.model.BodyTemperature;
import ies.g25.aLIVE.model.HeartRate;
import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.SugarLevel;
import ies.g25.aLIVE.repository.BloodPressureRepository;
import ies.g25.aLIVE.repository.BodyTemperatureRepository;
import ies.g25.aLIVE.repository.HeartRateRepository;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.SugarLevelRepository;

@RestController
@RequestMapping("/api/users")
public class PatientRestController {
    // get users, get health info from a user

    @Autowired
    public PatientRepository patientRepository;

    public HeartRateRepository heartRateRepository;
    public SugarLevelRepository sugarLevelRepository;
    public BloodPressureRepository bloodPressureRepository;
    public BodyTemperatureRepository bodyTemperatureRepository;

    public PatientRestController(PatientRepository patientRepository, HeartRateRepository heartRateRepository,
            SugarLevelRepository sugarLevelRepository, BloodPressureRepository bloodPressureRepository, BodyTemperatureRepository bodyTemperatureRepository) {
        this.patientRepository = patientRepository;
        this.heartRateRepository = heartRateRepository;
        this.sugarLevelRepository = sugarLevelRepository;
        this.bloodPressureRepository = bloodPressureRepository;
        this.bodyTemperatureRepository = bodyTemperatureRepository;
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
    public ResponseEntity<Patient> getPatientById(@PathVariable(value = "id") Long patientId)
            throws ResourceNotFoundException {
        Optional<Patient> op = patientRepository.findById(patientId);
        if (op.isPresent()) {
            Patient p = op.get();
            return ResponseEntity.ok().body(p);
        }
        throw new ResourceNotFoundException("Patient not found for this id: " + patientId);
    }

    @PostMapping("/{id}/picture")
    public Patient updatePhoto(@PathVariable(value = "id") Long patientId, @RequestParam("file") MultipartFile file)
            throws ResourceNotFoundException, IOException {
		Optional<Patient> op=  patientRepository.findById(patientId);
        if(op.isPresent()){
            Patient p = op.get();
            byte[] data = file.getBytes();
            p.setImage(data);
            patientRepository.save(p);
            return p;
        }
        throw new ResourceNotFoundException("Patient not found for this id: " + patientId);		
    }
    
    @GetMapping("/bloodpressure/month/{id}")
    public List<BloodPressure> getBloodPressureMonthStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return bloodPressureRepository.findByPatientLessThanMonth(now.minusMonths(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/bloodpressure/day/{id}")
    public List<BloodPressure> getBloodPressureDayStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return bloodPressureRepository.findByPatientLessThanMonth(now.minusDays(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/heartrate/month/{id}")
    public List<HeartRate> getHeartRateMonthStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return heartRateRepository.findByPatientLessThanMonth(now.minusMonths(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/heartrate/day/{id}")
    public List<HeartRate> getHeartRateDayStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return heartRateRepository.findByPatientLessThanMonth(now.minusDays(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/sugarlevel/month/{id}")
    public List<SugarLevel> getSugarLevelMonthStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return sugarLevelRepository.findByPatientLessThanMonth(now.minusMonths(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/sugarlevel/day/{id}")
    public List<SugarLevel> getSugarLevelDayStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return sugarLevelRepository.findByPatientLessThanMonth(now.minusDays(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/bodytemperature/month/{id}")
    public List<BodyTemperature> getBodyTemperatureMonthStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return bodyTemperatureRepository.findByPatientLessThanMonth(now.minusMonths(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/bodytemperature/day/{id}")
    public List<BodyTemperature> getBodyTemperatureDayStatusById(@PathVariable(value = "id") Long patientId) throws ResourceNotFoundException {
        LocalDateTime now = LocalDateTime.now();
        try {
            return bodyTemperatureRepository.findByPatientLessThanMonth(now.minusDays(1), patientId);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("/{pid}/latest")
    @ResponseBody
    public List<Object> getLatestValues(@PathVariable(value = "pid") long pid) throws ResourceNotFoundException {
        Sort sort = Sort.by("date").ascending().descending();
        Optional<Patient> op=patientRepository.findById(pid);
        if(op.isPresent()){
            List<Object> list = new ArrayList<Object>();
            Patient p = op.get();
            list.add(bloodPressureRepository.findFirstByPatient(p, sort));
            list.add(bodyTemperatureRepository.findFirstByPatient(p, sort));
            list.add(heartRateRepository.findFirstByPatient(p, sort));
            list.add(sugarLevelRepository.findFirstByPatient(p, sort));

             return list;
        }
        throw new ResourceNotFoundException("Patient not found for this id: " + pid);
    }

}