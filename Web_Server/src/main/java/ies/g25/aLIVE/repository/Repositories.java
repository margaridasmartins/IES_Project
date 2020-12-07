package ies.g25.aLIVE;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long>{

}

@Repository
public interface CaretakerRepository extends JpaRepository<Caretaker, Long>{

}

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

}

@Repository
public interface HearthRateRepository extends JpaRepository<HearthRate, Long>{

}

@Repository
public interface SugarLevelRepository extends JpaRepository<SugarLevel, Long>{

}

@Repository
public interface BloodPressureRepository extends JpaRepository<BloodPressure, Long>{

}