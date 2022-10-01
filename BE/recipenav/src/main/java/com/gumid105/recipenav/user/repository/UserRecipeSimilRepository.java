package com.gumid105.recipenav.user.repository;

import com.gumid105.recipenav.user.domain.UserRecipeSimil;
import com.gumid105.recipenav.user.domain.UserRecipeSimilPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRecipeSimilRepository extends JpaRepository<UserRecipeSimil, UserRecipeSimilPK> {

    @Query(value = "SELECT urs FROM UserRecipeSimil urs WHERE urs.pk.firstUser = :userSeq")
    List<UserRecipeSimil> findByFirstId(Long userSeq);

}
