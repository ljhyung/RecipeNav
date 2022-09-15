package com.gumid105.recipenav.recipe.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @GetMapping("")
    public ResponseEntity<?> getRecipes() {
        return null;
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<?> getRecipeDetail(@PathVariable Long recipeSeq) {
        return null;
    }

    @GetMapping("/reviews/{recipe-id}")
    public ResponseEntity<?> getReviews(@PathVariable Long recipeSeq) {
        return null;
    }

    @PostMapping("/reviews/{recipe-id}")
    public ResponseEntity<?> registerReviews(@PathVariable Long recipeSeq, @RequestBody Map req ) {
        return null;
    }

    @PutMapping("/reviews/{reviews-id}")
    public ResponseEntity<?> updateReviews(@PathVariable Long recipeSeq,@Valid @RequestBody Map req) {
        return null;
    }

    @DeleteMapping("/reviews/{reviews-id}")
    public ResponseEntity<?> deleteReviews(@PathVariable Long recipeSeq) {
        return null;
    }

    @GetMapping("/season-recipes")
    public ResponseEntity<?> getSeasonRecipes() {
        return null;
    }



//    @GetMapping("/recommendation?minPrice=<값>&maxPrice=<값>")
    @GetMapping("/recommendation")
    public ResponseEntity<?> getRecipeByPrice(@RequestParam Long minPrice, @RequestParam Long maxPrice) {
        return null;
    }
}
