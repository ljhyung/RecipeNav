package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.recipe.domain.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface RecipeIngredientRepository extends JpaRepository<RecipeIngredient, Long> {
}
