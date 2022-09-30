package com.gumid105.recipenav.ingredient.dto;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.user.domain.UserIngredient;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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

    private Double ingPriceRate;
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
        ingredientDto.ingPriceRate = ingredient.getIngPriceRate();
        ingredientDto.userIngredients = ingredient.getUserIngredients();

        return ingredientDto;
    }

    public static ArrayList<IngredientDto> ofList(List<Ingredient> ingredientList){
        ArrayList<IngredientDto> listIngredientDto = new ArrayList<>();
        int i=0;
        while(i < ingredientList.size()){
            IngredientDto ingredientDto = new IngredientDto();
            ingredientDto.ingSeq = ingredientList.get(i).getIngSeq();
            ingredientDto.ingName = ingredientList.get(i).getIngName();
            ingredientDto.ingDescription = ingredientList.get(i).getIngDescription();
            ingredientDto.ingExDate = ingredientList.get(i).getIngExDate();
            ingredientDto.ingCalorie = ingredientList.get(i).getIngCalorie();
            ingredientDto.ingSeason = ingredientList.get(i).getIngSeason();
            ingredientDto.ingCategory = ingredientList.get(i).getIngCategory();
            ingredientDto.ingImg = ingredientList.get(i).getIngImg();
            ingredientDto.ingPriceRate = ingredientList.get(i).getIngPriceRate();
            ingredientDto.userIngredients = ingredientList.get(i).getUserIngredients();

            listIngredientDto.add(ingredientDto);
            i++;
        }


        return listIngredientDto;
    }


}
