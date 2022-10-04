package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.recipe.domain.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
    List<RecipeIngredient> findRecipeIngredientsByRecipe_RecSeq(Long recSeq);
}
