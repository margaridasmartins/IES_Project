package ies.g25.aLIVE.restcontroller;

import java.beans.FeatureDescriptor;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.Professional;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.ProfessionalRepository;

@RestController
@RequestMapping("/api/professionals")
public class ProfessionalRestController {
    // get users, get health info from a user

    @Autowired
    public PatientRepository patientRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public ProfessionalRepository professionalRepository;

    public ProfessionalRestController(PatientRepository patientRepository, ProfessionalRepository professionalRepository) {
        this.patientRepository = patientRepository;
        this.professionalRepository=professionalRepository;
    }

    @GetMapping
    @ResponseBody
    public List<Professional> getAllProfessionals() {
        return professionalRepository.findAll();
    }

    @PostMapping
    public Professional createProfessional(@Valid @RequestBody Professional professional) {
        professional.setPassword(passwordEncoder.encode(professional.getPassword()));
        return professionalRepository.save(professional);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Professional')")
    public Professional replaceProfessional(@RequestBody Professional newProfessional, @PathVariable(value = "id") Long professionalId) 
            throws ResourceNotFoundException{
        Optional<Professional> op = professionalRepository.findById(professionalId);
        if (op.isPresent()) {
            Professional professional = op.get();
            newProfessional = (Professional) PersistenceUtils.partialUpdate(professional, newProfessional);
            return professionalRepository.save(newProfessional);
        }
        throw new ResourceNotFoundException("Professional not found for this id: " + professionalId);
    }

    @PostMapping("/{id}/picture")
    @PreAuthorize("hasRole('Professional')")
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

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('Professional')")
    public ResponseEntity<Professional> getProfessionalById(@PathVariable(value = "id") Long pID, HttpServletRequest request)
            throws ResourceNotFoundException {
        Principal principal = request.getUserPrincipal();
        System.out.println(principal.getName());
        Optional<Professional> op = professionalRepository.findById(pID);
        if (op.isPresent()) {
            Professional p = op.get();
            return ResponseEntity.ok().body(p);
        }
        throw new ResourceNotFoundException("Professional not found for this id: " + pID);
    }

    @GetMapping("/{id}/patients")
    @PreAuthorize("hasRole('Professional')")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> AllPatientsByProfessionalId(@PathVariable(value = "id") Long pId, @RequestParam(defaultValue = "0") 
        int page,@RequestParam(defaultValue = "10") int size, @RequestParam(required = false) String name, @RequestParam(required = false) String state)
            throws ResourceNotFoundException {
        Optional<Professional> op = professionalRepository.findById(pId);

        List<Patient> patients;
        Pageable paging = PageRequest.of(page, size,Sort.by(Sort.Direction.DESC, "lastcheck"));
        Page<Patient> pt;
        
        try{
            if(op.isPresent()){
                Professional p = op.get();
                if(name!=null){
                    pt = patientRepository.findByProfessionalAndFullnameContaining(p, name, paging);
                }else if(state!=null){
                    pt = patientRepository.findByProfessionalAndCurrentstate(p, state, paging);
                } else{
                    pt = patientRepository.findByProfessional(p, paging);
                }
            }
            else{
                throw new ResourceNotFoundException("Professional not found for this id: " + pId);
            }
            patients = pt.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("data", patients);
            response.put("currentPage", pt.getNumber());
            response.put("totalItems", pt.getTotalElements());
            response.put("totalPages", pt.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            throw new ResourceNotFoundException(e.getMessage()+e.getLocalizedMessage());
        } 
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
