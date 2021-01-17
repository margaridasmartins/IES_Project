package ies.g25.aLIVE;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.Professional;
import ies.g25.aLIVE.model.Sensor;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.ProfessionalRepository;
import ies.g25.aLIVE.repository.SensorRepository;



@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
  @Bean
  CommandLineRunner initDatabase(PatientRepository Prep, SensorRepository Srep, ProfessionalRepository Pro,PasswordEncoder passwordEncoder) {

    return args -> {
      Professional p = new Professional(passwordEncoder.encode("pass"),"carlitos","cls@jmail.com","Carlitos Sousa",34,"Male","Hospital de Braga", "Cardiologia","professional");

      Professional p2 = new Professional(passwordEncoder.encode("passita"),"anocas","anaaaa@jmail.com","Anocas Beatriz",44,"Female","Hospital de Aveiro", "Medicina Interna","professional");

      Patient d = new Patient(passwordEncoder.encode("pass1"), "manel123", "manel@jmail.com", "Manel Ribeiro",62,"Male", new Date(System.currentTimeMillis()-72*60*60*1000), "normal",1.75,67);

      d.addCondition("diabetes");
      d.addCondition("obesity");
      d.addCondition("asthma");

      d.setProfessional(p);
      

      Patient d3 = new Patient(passwordEncoder.encode("pass"), "ze123", "ze@jmail.com", "ze Ribeiro",89,"Male", new Date(System.currentTimeMillis()-48*60*60*1000), "normal",1.83,77);

      d3.setProfessional(p);
      d3.addCondition("diabetes");

      Patient d1 = new Patient(passwordEncoder.encode("pass2"), "silvia69", "silv@dmail.com", "Silvia Matos",74,"Female", new Date(System.currentTimeMillis()-24*60*60*1000), "in-danger", 1.66,70);

      d1.setProfessional(p);
      d1.addCondition("obesity");

      Patient d2 = new Patient(passwordEncoder.encode("pass3"), "ze321", "ze@dmail.com", "Zé Matos", 75,"Male", new Date(), "normal",1.69,80);

      d2.setProfessional(p2);

      log.info("Preloading " + Pro.save(p));
      log.info("Preloading " + Pro.save(p2));
      log.info("Preloading " + Prep.save(d));
      log.info("Preloading " + Prep.save(d1));    
      log.info("Preloading " + Prep.save(d2));
      log.info("Preloading " + Prep.save(d3));

      Sensor s1 =new Sensor( d);
      Sensor s2 = new Sensor( d1);
      Sensor s3 = new Sensor(d2);
      Sensor s4 = new Sensor(d3);

      log.info("Preloading " + Srep.save(s1));
      log.info("Preloading " + Srep.save(s2));
      log.info("Preloading " + Srep.save(s3));
      log.info("Preloading " + Srep.save(s4));
    };
  }


}

