package com.gumid105.recipenav.ingredient.dto;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.domain.IngredientPrice;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IngredientPriceDto {

    private Long ingPriceSeq;
    private Long ingredientSeq;
    private LocalDate ingDate;
    private Integer ingMinCost;
    private Integer ingMaxCost;
    private Integer ingAvgCost;


    public static ArrayList<IngredientPriceDto> ofList(List<IngredientPrice> ingredientList){
        ArrayList<IngredientPriceDto> listIngredientPriceDto = new ArrayList<>();
        int i=0;
        while(i < ingredientList.size()){
            IngredientPriceDto ingredientPriceDto = new IngredientPriceDto();
            ingredientPriceDto.ingPriceSeq = ingredientList.get(i).getIngPriceSeq();
            ingredientPriceDto.ingredientSeq = ingredientList.get(i).getIngredient().getIngSeq();
            ingredientPriceDto.ingDate = ingredientList.get(i).getIngDate();
            ingredientPriceDto.ingMinCost = ingredientList.get(i).getIngMinCost();
            ingredientPriceDto.ingMaxCost = ingredientList.get(i).getIngMaxCost();
            ingredientPriceDto.ingAvgCost = ingredientList.get(i).getIngAvgCost();

            listIngredientPriceDto.add(ingredientPriceDto);
            i++;
        }


        return listIngredientPriceDto;
    }
}
