package com.gumid105.recipenav.ingredient.repository;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    // containing이 like절을 사용해서 Integer값인 month가 db에서 String값인 ingSeason에 포함되는지 찾아주나?
    List<Ingredient> findIngredientsByIngSeasonContaining(Integer month);

    @Query("select i from Ingredient i where i.ingName like %:title% and i.ingredientPrice.ingAvgCost>:minPrice and i.ingredientPrice.ingAvgCost<:maxPrice and i.ingCategory like %:category% and i.ingSeason like %:season%")
    List<Ingredient> findIngredientsByOptions(String title, Integer minPrice, Integer maxPrice, String category, String season);


    List<Ingredient> findTop10ByOrderByIngPriceRateDesc();
    List<Ingredient> findTop10ByOrderByIngPriceRate();
    
    List<Ingredient> findIngredientsByIngNameContaining(String ingName);
}
