package ies.g25.aLIVE.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


@Entity
@Data
@DiscriminatorValue("Patient")
public class Patient extends User {

    @Column(name = "last_check")
    @Temporal(TemporalType.DATE)
    private Date last_check;

    @Column(name = "current_state")
    private String current_state;

    @Column(name = "med_conditions")
    private ArrayList<String> med_conditions;

    @Column(name = "medication")
    private ArrayList<String> medication; //dic medicamento:quantidade?

    @Column(name = "weight")
    private double weight;

    @Column(name = "height")
    private double height;



    //Assigned professional
    @ManyToOne
    @JoinColumn(name = "professional_id")
    private Professional professional;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<BloodPressure> bloodPressure;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<SugarLevel> sugarLevel;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<HeartRate> heartRate;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<BodyTemperature> bodyTemp;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Set<Sensor> sensors;
    
    public Patient(){

    }

    public Patient(String password, String username, String email, String fullname, 
    int age, String gender, Date last_check, String current_state, double height, double weight) {
        super(password, username, email, fullname, age, gender);
        this.last_check = last_check;
        this.current_state = current_state;
        this.height = height;
        this.weight = weight;
    }

    public void addCondition(String cond){
        this.med_conditions.add(cond);
    }

    public void removeCondition(String cond){
        this.med_conditions.remove(cond);
    }

    public void addMedication(String med){
        this.med_conditions.add(med);
    }

    public void removeMedication(String med){
        this.med_conditions.remove(med);
    }

    public String getCurrent_state(){
        return this.current_state;
    }

    public void setCurrent_state(String current_state){
        this.current_state=current_state;
    }
}