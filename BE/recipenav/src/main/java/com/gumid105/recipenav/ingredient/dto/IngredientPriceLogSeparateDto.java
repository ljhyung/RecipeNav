package com.gumid105.recipenav.ingredient.dto;

import com.gumid105.recipenav.ingredient.domain.IngredientPriceLog;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IngredientPriceLogSeparateDto {

    private Long ingPriceLogSeq;
    private String ingredientName;
    private Long ingredientSeq;

    private String category;
    private String ingUnit;
    private LocalDate ingDate;
    private Double ingCost;

    public static ArrayList<IngredientPriceLogSeparateDto> ofList(List<IngredientPriceLog> ingredientPriceLogList){
        ArrayList<IngredientPriceLogSeparateDto> listIngredientPriceLogSeparateDto = new ArrayList<>();
        int i=0;
        while(i<ingredientPriceLogList.size()){
            for(int j=0;j<3;j++){
                IngredientPriceLogSeparateDto ingredientPriceLogSeparateDto = new IngredientPriceLogSeparateDto();
                ingredientPriceLogSeparateDto.ingPriceLogSeq = ingredientPriceLogList.get(i).getIngPriceLogSeq();
                ingredientPriceLogSeparateDto.ingredientName = ingredientPriceLogList.get(i).getIngredient().getIngName();
                ingredientPriceLogSeparateDto.ingredientSeq = ingredientPriceLogList.get(i).getIngredient().getIngSeq();
                ingredientPriceLogSeparateDto.ingUnit = ingredientPriceLogList.get(i).getIngUnit();
                ingredientPriceLogSeparateDto.ingDate = ingredientPriceLogList.get(i).getIngDate();
                if(j==0) {
                    ingredientPriceLogSeparateDto.ingCost = ingredientPriceLogList.get(i).getIngMinCost();
                    ingredientPriceLogSeparateDto.category = "min";
                }
                if(j==1) {
                    ingredientPriceLogSeparateDto.ingCost = ingredientPriceLogList.get(i).getIngAvgCost();
                    ingredientPriceLogSeparateDto.category = "avg";
                }
                if(j==2) {
                    ingredientPriceLogSeparateDto.ingCost = ingredientPriceLogList.get(i).getIngMaxCost();
                    ingredientPriceLogSeparateDto.category = "max";
                }
                listIngredientPriceLogSeparateDto.add(ingredientPriceLogSeparateDto);
            }
            i++;
        }
        return listIngredientPriceLogSeparateDto;
    }
}
