package com.gumid105.recipenav.ingredient.repository;

import com.gumid105.recipenav.ingredient.domain.IngredientPriceLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientPriceLogRepository extends JpaRepository<IngredientPriceLog, Long> {
    List<IngredientPriceLog> findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(Long ingredientSeq);
}
