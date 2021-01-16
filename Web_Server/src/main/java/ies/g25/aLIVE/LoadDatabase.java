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
      //p.setImage(Files.readAllBytes(Path.of("./src/main/resources/static/no_photo.png")) );
      Professional p2 = new Professional(passwordEncoder.encode("passita"),"anocas","anaaaa@jmail.com","Anocas Beatriz",44,"Female","Hospital de Aveiro", "Medicina Interna","professional");
      //p2.setImage(Files.readAllBytes(Path.of("./src/main/resources/static/no_photo.png")) );
      Patient d = new Patient(passwordEncoder.encode("pass1"), "manel123", "manel@jmail.com", "Manel Ribeiro",62,"Male", new Date(), "normal",1.75,67);
      //d.setImage(Files.readAllBytes(Path.of("./src/main/resources/static/no_photo.png")) );
      d.setProfessional(p);
      Patient d1 = new Patient(passwordEncoder.encode("pass2"), "silvia69", "silv@dmail.com", "Silvia Matos",74,"Female", new Date(), "in-danger", 1.66,70);
      //d1.setImage(Files.readAllBytes(Path.of("./src/main/resources/static/no_photo.png")) );
      d1.setProfessional(p2);
      Patient d2 = new Patient(passwordEncoder.encode("pass3"), "ze321", "ze@dmail.com", "Zé Matos", 75,"Male", new Date(), "normal",1.69,80);
      //d2.setImage(Files.readAllBytes(Path.of("./src/main/resources/static/no_photo.png")) );
      d2.setProfessional(p2);

      log.info("Preloading " + Pro.save(p));
      log.info("Preloading " + Pro.save(p2));
      log.info("Preloading " + Prep.save(d));
      log.info("Preloading " + Prep.save(d1));    
      log.info("Preloading " + Prep.save(d2));

      Sensor s1 =new Sensor( d);
      Sensor s2 = new Sensor( d1);
      Sensor s3 = new Sensor(d2);

      log.info("Preloading " + Srep.save(s1));
      log.info("Preloading " + Srep.save(s2));
      log.info("Preloading " + Srep.save(s3));
    };
  }


}

