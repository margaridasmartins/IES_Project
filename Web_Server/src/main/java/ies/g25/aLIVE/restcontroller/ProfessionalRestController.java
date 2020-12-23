package ies.g25.aLIVE.restcontroller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ies.g25.aLIVE.exception.ResourceNotFoundException;
import ies.g25.aLIVE.model.Professional;
import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.ProfessionalRepository;


@RestController
@RequestMapping("/api/professionals")
public class ProfessionalRestController {
    // get users, get health info from a user

    @Autowired
    public PatientRepository patientRepository;

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
        return professionalRepository.save(professional);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professional> getProfessionalById(@PathVariable(value = "id") Long pID)
            throws ResourceNotFoundException {
        Optional<Professional> op = professionalRepository.findById(pID);
        if (op.isPresent()) {
            Professional p = op.get();
            return ResponseEntity.ok().body(p);
        }
        throw new ResourceNotFoundException("Professional not found for this id: " + pID);
    }

    @GetMapping("/{id}/patients")
    @ResponseBody
    public List<Patient>  AllPatientsByProfessionalId(@PathVariable(value = "id") Long pId)
            throws ResourceNotFoundException {
        Optional<Professional> op = professionalRepository.findById(pId);
        if(op.isPresent()){
            Professional p = op.get();   
            return patientRepository.findByProfessional(p);
        }
        throw new ResourceNotFoundException("Professional not found for this id: " + pId);  
    }
}
