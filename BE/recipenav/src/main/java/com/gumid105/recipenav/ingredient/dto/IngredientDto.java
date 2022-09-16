package com.gumid105.recipenav.ingredient.dto;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.user.domain.UserIngredient;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class IngredientDto {
    private Long ingSeq;
    private String ingName;
    private String ingDescription;
    private String ingExDate;
    private Integer ingCalorie;
    private String ingSeason;
    private String ingCategory;
    private String ingImg;
    private List<UserIngredient> userIngredients;

    public static IngredientDto of(Ingredient ingredient){
        IngredientDto ingredientDto = new IngredientDto();
        ingredientDto.ingSeq = ingredient.getIngSeq();
        ingredientDto.ingName = ingredient.getIngName();
        ingredientDto.ingDescription = ingredient.getIngDescription();
        ingredientDto.ingExDate = ingredient.getIngExDate();
        ingredientDto.ingCalorie = ingredient.getIngCalorie();
        ingredientDto.ingSeason = ingredient.getIngSeason();
        ingredientDto.ingCategory = ingredient.getIngCategory();
        ingredientDto.ingImg = ingredient.getIngImg();
        ingredientDto.userIngredients = ingredient.getUserIngredients();

        return ingredientDto;
    }


}
