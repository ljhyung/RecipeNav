package com.gumid105.recipenav.recipe.controller;

import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;

//    public RecipeController(RecipeService recipeService) {
//        this.recipeService = recipeService;
//    }

    @GetMapping("")
    public ResponseEntity<?> getRecipes() {
        return null;
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<RecipeDto> getRecipeDetail(@PathVariable Long recipeSeq) {
        return ResponseEntity.ok(recipeService.getRecipeDetail(recipeSeq));
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
