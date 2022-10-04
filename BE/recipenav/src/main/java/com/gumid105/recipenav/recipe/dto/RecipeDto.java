package com.gumid105.recipenav.recipe.dto;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.domain.RecipeIngredient;
import com.gumid105.recipenav.recipe.domain.RecipeProcess;
import com.gumid105.recipenav.recipe.domain.Review;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RecipeDto {
    private Long recSeq;
    private String recName;
    private String recStep;
    private String recCost;
    private String recCode;
    private String recSummary;
    private String cateCode;
    private String cateFrac;
    private String foodCode;
    private String foodFrac;
    private String cookingTime;
    private String recCalorie;
    private String recAmount;
    private String recLevel;
    private String recIngFrac;
    private Double recPrice;
    private String recImg;
    private List<Review> reviews;

    //userRecipes 유저와 다대다로 있는 값 dto에 포함?

    private List<RecipeIngredient> recipeIngredientList;
    private List<RecipeProcess> recipeProcessList;

    public static RecipeDto of(Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.recSeq = recipe.getRecSeq();
        recipeDto.recName = recipe.getRecName();
        recipeDto.recStep = recipe.getRecStep();
        recipeDto.recCost = recipe.getRecCost();
        recipeDto.recCode = recipe.getRecCode();
        recipeDto.recSummary = recipe.getRecSummary();
        recipeDto.cateCode = recipe.getCateCode();
        recipeDto.cateFrac = recipe.getCateFrac();
        recipeDto.foodCode = recipe.getFoodCode();
        recipeDto.foodFrac = recipe.getFoodFrac();
        recipeDto.cookingTime = recipe.getCookingTime();
        recipeDto.recCalorie = recipe.getRecCalorie();
        recipeDto.recAmount = recipe.getRecAmount();
        recipeDto.recLevel = recipe.getRecLevel();
        recipeDto.recIngFrac = recipe.getRecIngFrac();
        recipeDto.recPrice = recipe.getRecPrice();
        recipeDto.recImg = recipe.getRecImg();
        recipeDto.reviews = recipe.getReviews();
        recipeDto.recipeIngredientList = recipe.getRecipeIngredientList();
        recipeDto.recipeProcessList = recipe.getRecipeProcessList();

        return recipeDto;
    }


    public static ArrayList<RecipeDto> ofList(List<Recipe> recipeList){
        ArrayList<RecipeDto> listRecipeDto = new ArrayList<>();
        int i=0;
        while(i < recipeList.size()){
            RecipeDto recipeDto = new RecipeDto();
            recipeDto.recSeq = recipeList.get(i).getRecSeq();
            recipeDto.recName = recipeList.get(i).getRecName();
            recipeDto.recStep = recipeList.get(i).getRecStep();
            recipeDto.recCost = recipeList.get(i).getRecCost();
            recipeDto.recCode = recipeList.get(i).getRecCode();
            recipeDto.recSummary = recipeList.get(i).getRecSummary();
            recipeDto.cateCode = recipeList.get(i).getCateCode();
            recipeDto.cateFrac = recipeList.get(i).getCateFrac();
            recipeDto.foodCode = recipeList.get(i).getFoodCode();
            recipeDto.foodFrac = recipeList.get(i).getFoodFrac();
            recipeDto.cookingTime = recipeList.get(i).getCookingTime();
            recipeDto.recCalorie = recipeList.get(i).getRecCalorie();
            recipeDto.recAmount = recipeList.get(i).getRecAmount();
            recipeDto.recLevel = recipeList.get(i).getRecLevel();
            recipeDto.recIngFrac = recipeList.get(i).getRecIngFrac();
            recipeDto.recPrice = recipeList.get(i).getRecPrice();
            recipeDto.recImg = recipeList.get(i).getRecImg();
            recipeDto.reviews = recipeList.get(i).getReviews();
            recipeDto.recipeIngredientList = recipeList.get(i).getRecipeIngredientList();
            recipeDto.recipeProcessList = recipeList.get(i).getRecipeProcessList();

            listRecipeDto.add(recipeDto);
            i++;
        }


        return listRecipeDto;
    }
}
