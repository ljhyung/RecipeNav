package com.gumid105.recipenav.recipe.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @GetMapping("")
    public ResponseEntity<> getRecipes() {
        return;
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<> getRecipeDetail(@PathVariable Long recipeSeq) {
        return;
    }

    @GetMapping("/reviews/{recipe-id}")
    public ResponseEntity<> getReviews(@PathVariable Long recipeSeq) {
        return;
    }

    @PostMapping("/reviews/{recipe-id}")
    public ResponseEntity<> registerReviews(@Valid @RequestBody , @PathVariable Long recipeSeq) {
        return;
    }

    @PutMapping("/reviews/{reviews-id}")
    public ResponseEntity<> updateReviews(@Valid @RequestBody , @PathVariable Long recipeSeq) {
        return;
    }

    @DeleteMapping("/reviews/{reviews-id}")
    public ResponseEntity<> deleteReviews(@PathVariable Long recipeSeq) {
        return;
    }

    @GetMapping("/season-recipes")
    public ResponseEntity<> getSeasonRecipes() {
        return;
    }

    x

//    @GetMapping("/recommendation?minPrice=<값>&maxPrice=<값>")
    @GetMapping("/recommendation")
    public ResponseEntity<> getRecipeByPrice(@RequestParam Long minPrice, @RequestParam Long maxPrice) {
        return;
    }
}
