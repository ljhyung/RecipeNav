package com.gumid105.recipenav.recipe.dto;

import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.domain.RecipeIngredient;
import com.gumid105.recipenav.recipe.domain.RecipeProcess;
import com.gumid105.recipenav.recipe.domain.Review;
import lombok.Getter;
import lombok.Setter;

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
    private String recPrice;
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
}
