package com.gumid105.recipenav.user.repository;


import com.gumid105.recipenav.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

   Optional< User> findByUserId(String userId);

   //
   @Query("SELECT u FROM User u WHERE u.userId=:userId AND u.userSeq=:userSeq")
   Optional<User> findByUserSeqAndUserId(Long userSeq, String userId);


}
