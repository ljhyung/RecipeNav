package com.gumid105.auth.user;

import com.gumid105.auth.user.domain.User;
import org.hibernate.annotations.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

   Optional< User> findByUserId(String userId);
}
