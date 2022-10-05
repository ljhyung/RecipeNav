package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.recipe.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findRecipesByRecPriceIsBetween(Double minPrice, Double maxPrice);

    List<Recipe> findRecipesByRecNameContaining(String recipeName);

    @Query("select ri.recipe from Ingredient i inner join RecipeIngredient ri on i.ingName=ri.ingName and i.ingName=:ingName")
    List<Recipe> findRecipesByIngredientName(String ingName);

    @Query("select r2 from Recipe r2 where r2.recSeq in (select rs.recipeSeqSecond from RecipeSimil rs inner Join Recipe r on rs.recipeSeqFirst=r.recSeq and r.recSeq=:recipeSeq)")
    List<Recipe> findRecipesBySimilarity(Long recipeSeq);

    @Query(value = "select * from t_recipe order by RAND() limit 5", nativeQuery = true)
    List<Recipe> findRecipesByRandom();

    Optional<Recipe> findFirstByOrderByRecPriceDesc();
}
