package ies.g25.aLIVE.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Data
@DiscriminatorValue("Professional")
public class Professional extends User {

    @Column(name = "workplace")
    private String workplace;

    @Column(name = "speciality")
    private String speciality;

    @Column(name = "type")  //Doctor or Caretaker
    private String type;

    //Patients assigned to professional
    @OneToMany(mappedBy = "professional", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JsonIgnore
    private Set<Patient> patients;

    public Professional(){

    }

    public Professional(String password, String username, String email, String fullname, 
    int age, String gender, String workplace, String speciality, String type) {
        super(password, username, email, fullname, age, gender);
        this.workplace = workplace;
        this.speciality = speciality;
        this.type = type;
    }
}





