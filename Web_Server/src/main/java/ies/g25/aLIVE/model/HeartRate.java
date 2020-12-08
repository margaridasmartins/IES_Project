//data de recolha, id paciente, beats per minute
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
@Table(name="HEART_RATE")
public class HeartRate{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // date of the mesure
    @Column(name="date",nullable = false, updatable = false)
    @CreationTimestamp
    private Date date;

    // Hert Rate values
    @Column(name="heart_rate")
    private int heart_rate;

    //Patient Id
    @ManyToOne()
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public HeartRate(){}

    public HeartRate(int heart_rate, Patient patient){
        this.heart_rate=heart_rate;
        this.patient=patient;
    }

    public void setHeartRate(int heart_rate){
        this.heart_rate=heart_rate;
    }
    public int getHeartRate(){
        return this.heart_rate;
    }

    public Date getDate(){
        return this.date;
    }
    public Patient getPatientId(){
        return this.patient;
    }
}