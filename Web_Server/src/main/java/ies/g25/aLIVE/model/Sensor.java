package ies.g25.aLIVE.model;

import java.sql.Date;
import lombok.Data;
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
@Data
@Table(name="SENSOR")
public class Sensor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    //Patient Id
    @ManyToOne()
    @JoinColumn(name = "patient_id")
    private Patient patient;

    public Sensor(){

    }

    public Sensor(Patient patient){
        this.patient=patient;
    }

    public Patient getPatient(){
        return this.patient;
    }
}
