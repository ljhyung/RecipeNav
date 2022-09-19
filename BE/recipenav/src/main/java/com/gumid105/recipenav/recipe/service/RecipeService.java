package com.gumid105.recipenav.recipe.service;

import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.domain.RecipeProcess;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeProcessRepository;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;

    public RecipeDto getRecipeDetail(Long seq){
        Optional<Recipe> recipeOptional = recipeRepository.findById(seq);
        Recipe recipe = recipeOptional.get();
        return RecipeDto.of(recipe);
    }
}
