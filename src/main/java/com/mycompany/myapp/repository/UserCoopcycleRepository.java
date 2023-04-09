package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UserCoopcycle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserCoopcycle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserCoopcycleRepository extends JpaRepository<UserCoopcycle, Long> {}
