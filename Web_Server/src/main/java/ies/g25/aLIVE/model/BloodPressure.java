//data de recolha, id paciente, high and low values
package ies.g25.aLIVE.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name="BLOOD_PRESSURE")
public class BloodPressure{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // date of the mesure
    @Column(name="date",nullable = false, updatable = false)
    @CreationTimestamp
    private Date date;

    // Blood Pressure values
    @Column(name = "high_value")
    private double high_value;

    @Column(name = "low_value")
    private double low_value;

    //Patient Id
    @ManyToOne()
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public BloodPressure(){}

    public BloodPressure(double high_value, double low_value){
        this.high_value=high_value;
        this.low_value=low_value;
    }

    public void setHigh_value(double high_value){
        this.high_value=high_value;
    }
    public double getHigh_value(){
        return this.high_value;
    }

    public void setLow_value(double low_value){
        this.low_value=low_value;
    }
    public double getLow_value(){
        return this.low_value;
    }

    public Date getDate(){
        return this.date;
    }
    public Patient getPatient(){
        return this.patient;
    }
    public void setPatient(Patient p){
        this.patient=p;
    }
}