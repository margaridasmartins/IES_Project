package ies.g25.aLIVE.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name="USER")
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="user_type", discriminatorType = DiscriminatorType.STRING)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    
    public User(String password, String username, String email, String fullname, int age) {
        this.password = password;
        this.username = username;
        this.email = email;
        this.fullname = fullname;
        this.age = age;
    }

    public String getEmail(){
        return this.email;
    }

    public Long getId(){
        return this.id;
    }
}


