package com.gumid105.recipenav.ingredient.service;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;

    public List<IngredientDto> getAllIngredient(){
        List<Ingredient> ingredientList = ingredientRepository.findAll();
        return IngredientDto.ofList(ingredientList);
    }

    public IngredientDto getIngredientDetail(Long seq){
        Optional<Ingredient> ingredientOptional = ingredientRepository.findById(seq);
        Ingredient ingredient = ingredientOptional.get();
        return IngredientDto.of(ingredient);
    }



}
