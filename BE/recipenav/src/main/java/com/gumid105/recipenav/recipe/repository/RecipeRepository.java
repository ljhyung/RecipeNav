package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.recipe.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findRecipesByRecPriceIsBetween(Integer minPrice, Integer maxPrice);
}
