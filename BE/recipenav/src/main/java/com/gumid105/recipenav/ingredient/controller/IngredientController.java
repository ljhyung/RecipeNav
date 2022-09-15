package com.gumid105.recipenav.ingredient.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @GetMapping("")
    public ResponseEntity<?> getIngredients(@PathVariable Long recipeSeq) {
        return null;
    }

    @GetMapping("/list")
    public ResponseEntity<?> searchIngredients(@RequestParam(required = false) String title, @RequestParam(required = false) Long minPrice,
                                              @RequestParam(required = false) Long maxPrice, @RequestParam(required = false) List<String> category) {
        return null;
    }

    @GetMapping("/{ingredients-id}")
    public ResponseEntity<?> getIngredientDetail(@PathVariable Long ingredientsSeq) {
        return null;
    }

    @GetMapping("/{ingredients-id}/recipes")
    public ResponseEntity<?> getRecipesByIngredient(@PathVariable Long ingredientsSeq) {
        return null;
    }

    @GetMapping("/season-ingredients")
    public ResponseEntity<?> getSeasonIngredients() {
        return null;
    }

    @GetMapping("/topgainers")
    public ResponseEntity<?> getIngredientByTopGainers() {
        return null;
    }

    @GetMapping("/toplosers")
    public ResponseEntity<?> getIngredientByTopLosers() {
        return null;
    }


}
