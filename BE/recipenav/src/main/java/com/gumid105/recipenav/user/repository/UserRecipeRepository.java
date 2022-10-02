package com.gumid105.recipenav.user.repository;

import com.gumid105.recipenav.user.domain.UserRecipe;
import com.gumid105.recipenav.user.dto.UserRecipeDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface UserRecipeRepository extends JpaRepository<UserRecipe,Long> {
//    @Query("SELECT u FROM UserRecipe WHERE u.user_seq=:user_seq AND u.recipe_seq=:recipe_seq")
   Optional<UserRecipeDto> findByUser_userSeqAndRecipe_recSeq(Long user_seq, Long recipe_seq);
   List<UserRecipeDto> findAllByUser_userSeq(Long user_seq);
    //Optional<UserRecipe> findByUserIdAndRecipeId(Long userId, Long recipeId);

   @Modifying
   @Query("delete from UserRecipe ur  WHERE ur.user.userSeq=:user_seq AND ur.recipe.recSeq=:recipe_seq")
   int deleteUsersByUser(Long user_seq, Long recipe_seq);

   @Query(value = "SELECT ur.recipe as recipe,COUNT(ur.recipe) as weight FROM UserRecipe ur \n" +
           "WHERE ur.user.userSeq IN (:otherUserSeqs) AND ur.recipe NOT IN (SELECT ur2.recipe FROM UserRecipe ur2 WHERE ur2.user.userSeq = :mySeq)\n" +
           "GROUP BY ur.recipe\n" +
           "ORDER BY weight DESC,ur.recipe ASC")
   List<Map<String,Object>> findLikeRecipeInSimilarUser(List<Long> otherUserSeqs, Long mySeq, Pageable pageable) ;
}
