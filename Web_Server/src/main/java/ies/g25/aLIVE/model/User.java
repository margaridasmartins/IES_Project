package ies.g25.aLIVE;

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

@Entity
@Table(name="USER")
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_type", discriminatorType = DiscriminatorType.STRING)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "password")
    @ToString.Exclude
    private String password;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "fullname")
    private String fullname;

    @Column(name = "age")
    private int age;

    public User(){

    }
    
    public User(long id, String password, String username, String email, String fullname, int age) {
        this.id = id;
        this.password = password;
        this.username = username;
        this.email = email;
        this.fullname = fullname;
        this.age = age;
    }

}


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

    @OneToMany(mappedBy = "professional", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Patient> patients;

    public Professional(){

    }

    public Professional(long id, String password, String username, String email, String fullname, 
    int age, String workplace, String speciality, String type) {
        super(id, password, username, email, fullname, age);
        this.workplace = workplace;
        this.speciality = speciality;
        this.type = type;
    }
}

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