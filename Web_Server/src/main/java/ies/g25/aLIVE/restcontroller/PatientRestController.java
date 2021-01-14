package ies.g25.aLIVE.restcontroller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;
import java.beans.FeatureDescriptor;

import javax.validation.Valid;
import org.springframework.beans.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
import ies.g25.aLIVE.model.PatientContext;
import ies.g25.aLIVE.model.Professional;
import ies.g25.aLIVE.model.SugarLevel;
import ies.g25.aLIVE.repository.BloodPressureRepository;
import ies.g25.aLIVE.repository.BodyTemperatureRepository;
import ies.g25.aLIVE.repository.HeartRateRepository;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.ProfessionalRepository;
import ies.g25.aLIVE.repository.SugarLevelRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/patients")
public class PatientRestController {
    // get users, get health info from a user

    @Autowired
    public PatientRepository patientRepository;

    public HeartRateRepository heartRateRepository;
    public SugarLevelRepository sugarLevelRepository;
    public BloodPressureRepository bloodPressureRepository;
    public BodyTemperatureRepository bodyTemperatureRepository;
    public ProfessionalRepository professionalRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;


    public PatientRestController(PatientRepository patientRepository, HeartRateRepository heartRateRepository,
            SugarLevelRepository sugarLevelRepository, BloodPressureRepository bloodPressureRepository, 
            BodyTemperatureRepository bodyTemperatureRepository, ProfessionalRepository professionalRepository) {
        this.patientRepository = patientRepository;
        this.heartRateRepository = heartRateRepository;
        this.sugarLevelRepository = sugarLevelRepository;
        this.bloodPressureRepository = bloodPressureRepository;
        this.bodyTemperatureRepository = bodyTemperatureRepository;
        this.professionalRepository = professionalRepository;
    }

    @GetMapping
    @ResponseBody
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }


    @PostMapping
    public Patient createPatient(@Valid @RequestBody PatientContext patient)throws ResourceNotFoundException {
        Optional<Professional> p= professionalRepository.findByEmail(patient.getPemail());
        if(p.isPresent()){
            Patient pat = patient.getPatient();
            pat.setProfessional(p.get());
            pat.setPassword(passwordEncoder.encode(pat.getPassword()));
            return patientRepository.save(pat);
        }
        throw new ResourceNotFoundException("Professional not found for this id");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Patient')")
    public Patient replacePatient(@RequestBody Patient newPatient, @PathVariable(value = "id") Long patientId) 
            throws ResourceNotFoundException{
        Optional<Patient> op = patientRepository.findById(patientId);
        if (op.isPresent()) {
            Patient patient = op.get();
            newPatient = (Patient) PersistenceUtils.partialUpdate(patient, newPatient);
            return patientRepository.save(newPatient);
        }
        throw new ResourceNotFoundException("Patient not found for this id: " + patientId);
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
    @PreAuthorize("hasRole('Patient')")
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
    
    @GetMapping("{id}/bloodpressure")
    public ResponseEntity<Map<String, Object>> getBloodPressureByIdAndDate(@PathVariable(value = "id") Long patientId,
        @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start_date, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end_date      
         ) throws ResourceNotFoundException {

        List<BloodPressure> bloodPressures;
        Pageable paging = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "date"));
        Page<BloodPressure> bp;

        try {
            if (start_date != null &&  end_date!=null){
                bp= bloodPressureRepository.findByPatientandDate(start_date,end_date, patientId, paging);
            }
            else{
                Optional<Patient> op = patientRepository.findById(patientId);
                if (op.isPresent()) {
                    Patient p = op.get();
                    bp = bloodPressureRepository.findByPatient(p, paging);
                }
                else{
                    throw new ResourceNotFoundException("Patient not found for this id: " + patientId);
                }
            }
            bloodPressures = bp.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("data", bloodPressures);
            response.put("currentPage", bp.getNumber());
            response.put("totalItems", bp.getTotalElements());
            response.put("totalPages", bp.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
            

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("{id}/heartrate")
    public ResponseEntity<Map<String, Object>> getHeartRateByIdAndDate(@PathVariable(value = "id") Long patientId,
        @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start_date, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end_date      
         ) throws ResourceNotFoundException {

        List<HeartRate> heartRates;
        Pageable paging = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "date"));
        Page<HeartRate> hr;

        try {
            if (start_date != null &&  end_date!=null){
                hr= heartRateRepository.findByPatientandDate(start_date,end_date, patientId, paging);
            }
            else{
                Optional<Patient> op = patientRepository.findById(patientId);
                if (op.isPresent()) {
                    Patient p = op.get();
                    hr = heartRateRepository.findByPatient(p, paging);
                }
                else{
                    throw new ResourceNotFoundException("Patient not found for this id: " + patientId);
                }
            }
            heartRates = hr.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("data", heartRates);
            response.put("currentPage", hr.getNumber());
            response.put("totalItems", hr.getTotalElements());
            response.put("totalPages", hr.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
            

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 

    }

    @GetMapping("{id}/sugarlevel")
    public ResponseEntity<Map<String, Object>> getSugarLevelByIdAndDate(@PathVariable(value = "id") Long patientId,
        @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start_date, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end_date      
        ) throws ResourceNotFoundException {

        List<SugarLevel> sugarlevels;
        Pageable paging = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "date"));
        Page<SugarLevel> sl;

        try {
            if (start_date != null &&  end_date!=null){
                sl= sugarLevelRepository.findByPatientandDate(start_date,end_date, patientId, paging);
            }
            else{
                Optional<Patient> op = patientRepository.findById(patientId);
                if (op.isPresent()) {
                    Patient p = op.get();
                    sl = sugarLevelRepository.findByPatient(p, paging);
                }
                else{
                    throw new ResourceNotFoundException("Patient not found for this id: " + patientId);
                }
            }
            sugarlevels = sl.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("data", sugarlevels);
            response.put("currentPage", sl.getNumber());
            response.put("totalItems", sl.getTotalElements());
            response.put("totalPages", sl.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
            

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        }
    } 


    @GetMapping("{id}/bodytemperature")
    public ResponseEntity<Map<String, Object>> getBodyTemperatureByIdAndDate(@PathVariable(value = "id") Long patientId,
        @RequestParam(defaultValue = "0") int page,@RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start_date, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end_date      
        ) throws ResourceNotFoundException {

        List<BodyTemperature> bodyTemperatures;
        Pageable paging = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "date"));
        Page<BodyTemperature> bt;

        try {
            if (start_date != null &&  end_date!=null){
                bt= bodyTemperatureRepository.findByPatientandDate(start_date,end_date, patientId, paging);
            }
            else{
                Optional<Patient> op = patientRepository.findById(patientId);
                if (op.isPresent()) {
                    Patient p = op.get();
                    bt = bodyTemperatureRepository.findByPatient(p, paging);
                }
                else{
                    throw new ResourceNotFoundException("Patient not found for this id: " + patientId);
                }
            }
            bodyTemperatures = bt.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("data", bodyTemperatures);
            response.put("currentPage", bt.getNumber());
            response.put("totalItems", bt.getTotalElements());
            response.put("totalPages", bt.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
            

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


    public static class PersistenceUtils {

        public static Object partialUpdate(Object dbObject, Object partialUpdateObject){
            String[] ignoredProperties = getNullPropertyNames(partialUpdateObject);
            BeanUtils.copyProperties(partialUpdateObject, dbObject, ignoredProperties);
            return dbObject;
        }
    
        private static String[] getNullPropertyNames(Object object) {
            final BeanWrapper wrappedSource = new BeanWrapperImpl(object);
            return Stream.of(wrappedSource.getPropertyDescriptors())
                    .map(FeatureDescriptor::getName)
                    .filter(propertyName -> wrappedSource.getPropertyValue(propertyName) == null)
                    .toArray(String[]::new);
        }
    
    
    }

}