package ies.g25.aLIVE;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.Sensor;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.SensorRepository;


@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
  @Bean
  CommandLineRunner initDatabase(PatientRepository Prep, SensorRepository Srep) {

    return args -> {
      log.info("Preloading " + Prep.save(new Patient("pass1", "manel123", "manel@jmail.com", "Manel Ribeiro", 
      62, new Date(), "good")));
      Patient p1 = new Patient("pass2", "silvia69", "silv@dmail.com", "Silvia Matos", 
      74, new Date(), "very good");
      log.info("Preloading " + Prep.save(p1));
      Patient p = new Patient("pass3", "ze321", "ze@dmail.com", "Zé Matos", 75, new Date(), "very good");
      log.info("Preloading " + Prep.save(p));
      log.info("Preloading " + Srep.save(new Sensor( p)));
      log.info("Preloading " + Srep.save(new Sensor( p1)));
      log.info("Preloading " + Srep.save(new Sensor( p1)));
    };
  }


}

