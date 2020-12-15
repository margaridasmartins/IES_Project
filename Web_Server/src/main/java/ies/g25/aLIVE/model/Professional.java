package ies.g25.aLIVE.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.DiscriminatorType;
import javax.persistence.CascadeType;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;



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
    private Set<Patient> patients;

    public Professional(){

    }

    public Professional(String password, String username, String email, String fullname, 
    int age, String gender, String workplace, String speciality, String type) {
        super(password, username, email, fullname, age);
        this.workplace = workplace;
        this.speciality = speciality;
        this.type = type;
    }
}





