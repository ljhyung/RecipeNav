package com.gumid105.recipenav.ingredient.repository;

import com.gumid105.recipenav.ingredient.domain.IngredientPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientPriceRepository extends JpaRepository<IngredientPrice, Long> {
    List<IngredientPrice> findIngredientPricesByIngredient_IngSeq(Long IngSeq);
}
