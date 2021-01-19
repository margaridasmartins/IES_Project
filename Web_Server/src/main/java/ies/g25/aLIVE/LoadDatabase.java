package ies.g25.aLIVE;

import java.util.Date;
import java.util.Optional;
import java.util.Random;
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
import java.sql.Timestamp;

import ies.g25.aLIVE.model.BloodPressure;
import ies.g25.aLIVE.model.BodyTemperature;
import ies.g25.aLIVE.model.HeartRate;
import ies.g25.aLIVE.model.OxygenLevel;
import ies.g25.aLIVE.model.Patient;
import ies.g25.aLIVE.model.Professional;
import ies.g25.aLIVE.model.Sensor;
import ies.g25.aLIVE.model.SugarLevel;
import ies.g25.aLIVE.model.User;
import ies.g25.aLIVE.repository.BloodPressureRepository;
import ies.g25.aLIVE.repository.BodyTemperatureRepository;
import ies.g25.aLIVE.repository.HeartRateRepository;
import ies.g25.aLIVE.repository.OxygenLevelRepository;
import ies.g25.aLIVE.repository.PatientRepository;
import ies.g25.aLIVE.repository.ProfessionalRepository;
import ies.g25.aLIVE.repository.SensorRepository;
import ies.g25.aLIVE.repository.SugarLevelRepository;
import ies.g25.aLIVE.repository.UserRepository;

import java.time.*;
import java.time.temporal.ChronoUnit;

@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(PatientRepository Prep, SensorRepository Srep, ProfessionalRepository Pro,
      PasswordEncoder passwordEncoder, BloodPressureRepository bloodPressureRepository,
      BodyTemperatureRepository bodyTemperatureRepository, HeartRateRepository heartRateRepository,
      OxygenLevelRepository oxygenLevelRepository, SugarLevelRepository sugarLevelRepository, UserRepository userRepository) {

    return args -> {

      
    };
    
  }
  

}

