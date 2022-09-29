package com.gumid105.recipenav.ingredient.dto;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import lombok.Getter;

@Getter
public class ChangeRate implements Comparable<ChangeRate>{
    private Double rate;
    private IngredientDto ingredientDto;

    public ChangeRate(Double rate, IngredientDto ingredientDto){
        this.rate = rate;
        this.ingredientDto = ingredientDto;
    }

    @Override
    public int compareTo(ChangeRate changeRate) {
        if (this.rate < changeRate.getRate())
            return 1;
        else if (this.rate>changeRate.getRate()) {
            return -1;
        }
        return 0;
    }
}
