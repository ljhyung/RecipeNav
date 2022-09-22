package com.gumid105.recipenav.ingredient.repository;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    // containing이 like절을 사용해서 Integer값인 month가 db에서 String값인 ingSeason에 포함되는지 찾아주나?
    List<Ingredient> findIngredientsByIngSeasonContaining(Integer month);
}
