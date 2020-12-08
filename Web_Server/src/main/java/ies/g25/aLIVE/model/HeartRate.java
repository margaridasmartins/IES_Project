//data de recolha, id paciente, beats per minute
package ies.g25.aLIVE.model;

import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
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
    @JoinColumn(name = "id")
    private Long patient_id;

    public HeartRate(){}

    public HeartRate(int heart_rate, long patient_id){
        this.heart_rate=heart_rate;
        this.patient_id=patient_id;
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
    public double getPatientId(){
        return this.patient_id;
    }
}