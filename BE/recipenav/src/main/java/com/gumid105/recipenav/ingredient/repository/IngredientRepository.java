package com.gumid105.recipenav.ingredient.repository;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
