package com.gumid105.recipenav.ingredient.controller;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.ingredient.dto.IngredientPriceLogDto;
import com.gumid105.recipenav.ingredient.service.IngredientService;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {
    private final IngredientService ingredientService;

    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("")
    public ResponseEntity<Page<Ingredient>> getIngredients(@RequestParam Integer page, @RequestParam Integer size) {
        return ResponseEntity.ok(ingredientService.getAllIngredient(page-1, size));
    }

    @GetMapping("/list")
    public ResponseEntity<?> searchIngredients(@RequestParam(required = false, defaultValue = "") String title, @RequestParam(required = false, defaultValue = "1") Integer minPrice,
                                              @RequestParam(required = false, defaultValue = "1000000") Integer maxPrice, @RequestParam(required = false, defaultValue = "") String category,
                                               @RequestParam(required = false, defaultValue = "") String season) {
        return ResponseEntity.ok(ingredientService.searchIngredients(title, minPrice, maxPrice, category, season));
    }

    @GetMapping("/{ingredients-id}")
    public ResponseEntity<IngredientDto> getIngredientDetail(@PathVariable("ingredients-id") Long ingredientsSeq) {
        return ResponseEntity.ok(ingredientService.getIngredientDetail(ingredientsSeq));
    }

    @GetMapping("/{ingredients-id}/recipes")
    public ResponseEntity<List<RecipeDto>> getRecipesByIngredient(@PathVariable("ingredients-id") Long ingredientsSeq) {
        return ResponseEntity.ok(ingredientService.getRecipesByIngredient(ingredientsSeq));
    }

    @GetMapping("/season-ingredients/{month}")
    public ResponseEntity<List<IngredientDto>> getSeasonIngredients(@PathVariable("month") Integer month) {
        return ResponseEntity.ok(ingredientService.getSeasonIngredients(month));
    }

    @GetMapping("/topgainers")
    public ResponseEntity<?> getIngredientByTopGainers() {
        return null;
    }

    @GetMapping("/toplosers")
    public ResponseEntity<?> getIngredientByTopLosers() {
        return null;
    }

    @GetMapping("/price-log/{ingredient-seq}")
    public ResponseEntity<List<IngredientPriceLogDto>> getIngredientPriceLog(@PathVariable("ingredient-seq") Long ingredientSeq) {
        return ResponseEntity.ok(ingredientService.getIngredientPriceLog(ingredientSeq));
    }
}
