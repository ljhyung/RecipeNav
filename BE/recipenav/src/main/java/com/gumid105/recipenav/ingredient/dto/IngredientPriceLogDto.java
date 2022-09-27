package com.gumid105.recipenav.ingredient.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.domain.IngredientPriceLog;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IngredientPriceLogDto {

    private Long ingPriceLogSeq;
    private String ingredientName;
    private Long ingredientSeq;
    private Integer ingPcode;
    private Integer ingPScode;
    private String ingUnit;
    private LocalDate ingDate;
    private Double ingMinCost;
    private Double ingAvgCost;
    private Double ingMaxCost;

    public static ArrayList<IngredientPriceLogDto> ofList(List<IngredientPriceLog> ingredientPriceLogList){
        ArrayList<IngredientPriceLogDto> ListIngredientPriceLogDto = new ArrayList<>();
        int i=0;
        while(i<ingredientPriceLogList.size()){
            IngredientPriceLogDto ingredientPriceLogDto = new IngredientPriceLogDto();
            ingredientPriceLogDto.ingPriceLogSeq = ingredientPriceLogList.get(i).getIngPriceLogSeq();
            ingredientPriceLogDto.ingredientName = ingredientPriceLogList.get(i).getIngredient().getIngName();
            ingredientPriceLogDto.ingredientSeq = ingredientPriceLogList.get(i).getIngredient().getIngSeq();
            ingredientPriceLogDto.ingPcode = ingredientPriceLogList.get(i).getIngPcode();
            ingredientPriceLogDto.ingPScode = ingredientPriceLogList.get(i).getIngPScode();
            ingredientPriceLogDto.ingUnit = ingredientPriceLogList.get(i).getIngUnit();
            ingredientPriceLogDto.ingDate = ingredientPriceLogList.get(i).getIngDate();
            ingredientPriceLogDto.ingMinCost = ingredientPriceLogList.get(i).getIngMinCost();
            ingredientPriceLogDto.ingAvgCost = ingredientPriceLogList.get(i).getIngAvgCost();
            ingredientPriceLogDto.ingMaxCost = ingredientPriceLogList.get(i).getIngMaxCost();
            ListIngredientPriceLogDto.add(ingredientPriceLogDto);
            i++;
        }
        return ListIngredientPriceLogDto;
    }
}
