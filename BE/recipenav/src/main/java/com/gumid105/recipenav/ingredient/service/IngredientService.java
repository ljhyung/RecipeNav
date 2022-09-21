package com.gumid105.recipenav.ingredient.service;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;

    public List<IngredientDto> getAllIngredient(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page,size);
        List<Ingredient> ingredientList = ingredientRepository.findAll(pageRequest).getContent();
        return IngredientDto.ofList(ingredientList);
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



}
