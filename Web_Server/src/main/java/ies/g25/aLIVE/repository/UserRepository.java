package ies.g25.aLIVE.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ies.g25.aLIVE.model.User;




@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}