package com.gumid105.recipenav.ingredient.service;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;

    public Page<Ingredient> getAllIngredient(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page,size);
        Page<Ingredient> ingredientPage = ingredientRepository.findAll(pageRequest);
//        List<Ingredient> ingredientList = ingredientRepository.findAll(pageRequest).getContent();
        return ingredientPage;
    }

    public IngredientDto getIngredientDetail(Long seq){
        Optional<Ingredient> ingredientOptional = ingredientRepository.findById(seq);
        Ingredient ingredient = ingredientOptional.get();
        return IngredientDto.of(ingredient);
    }

    public List<RecipeDto> getRecipesByIngredient(Long ingredientSeq){
        Optional<Ingredient> ingredientOptional = ingredientRepository.findById(ingredientSeq);
        Ingredient ingredient = ingredientOptional.get();
        List<Recipe> recipeList = recipeRepository.findRecipesByIngredientName(ingredient.getIngName());
        return RecipeDto.ofList(recipeList);
    }

    public List<IngredientDto> getSeasonIngredients(Integer month){
        List<Ingredient> ingredientList = ingredientRepository.findIngredientsByIngSeasonContaining(month);
        return IngredientDto.ofList(ingredientList);
    }

    public List<IngredientDto> searchIngredients(String title, Integer minPrice, Integer maxPrice, String category, String season){
        List<Ingredient> ingredientList = ingredientRepository.findIngredientsByOptions(title, minPrice, maxPrice, category, season);
        return IngredientDto.ofList(ingredientList);
    }




}
