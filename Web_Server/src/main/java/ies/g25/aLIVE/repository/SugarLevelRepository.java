package ies.g25.aLIVE.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import ies.g25.aLIVE.model.*;


@Repository
public interface SugarLevelRepository extends JpaRepository<SugarLevel, Long>{

    List<SugarLevel> findByPatient(Patient p);
}