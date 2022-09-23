package com.gumid105.recipenav.user.repository;

import com.gumid105.recipenav.user.domain.UserRecipe;
import com.gumid105.recipenav.user.dto.UserRecipeDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRecipeRepository extends JpaRepository<UserRecipe,Long> {
//    @Query("SELECT u FROM UserRecipe WHERE u.user_seq=:user_seq AND u.recipe_seq=:recipe_seq")
   Optional<UserRecipeDto> findByUser_userSeqAndRecipe_recSeq(Long user_seq, Long recipe_seq);
   List<UserRecipeDto> findAllByUser_userSeq(Long user_seq);
    //Optional<UserRecipe> findByUserIdAndRecipeId(Long userId, Long recipeId);

}
