package com.gumid105.recipenav.user.repository;

import com.gumid105.recipenav.user.domain.UserIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserIngredientRepository extends JpaRepository<UserIngredient, Long> {
    Optional<UserIngredient> findByUser_UserSeqAndIngredient_IngSeq(Long userSeq, Long ingSeq);
}
