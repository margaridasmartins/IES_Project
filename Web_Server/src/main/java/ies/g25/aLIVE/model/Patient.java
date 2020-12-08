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
@DiscriminatorValue("Patient")
public class Patient extends User {

    @Column(name = "last_check")
    @Temporal(TemporalType.DATE)
    private Date last_check;

    @Column(name = "current_state")
    private String current_state;

    @ManyToOne
    @JoinColumn(name = "professional_id")
    private Professional professional;
    
    public Patient(){

    }

    public Patient(long id, String password, String username, String email, String fullname, 
    int age, Date last_check, String current_state, Professional professional) {
        super(id, password, username, email, fullname, age);
        this.last_check = last_check;
        this.current_state = current_state;
        this.professional = professional;
    }
}