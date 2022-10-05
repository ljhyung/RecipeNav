package com.gumid105.recipenav.recipe.controller;

import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.dto.ReqReviewDto;
import com.gumid105.recipenav.recipe.dto.ReviewDto;
import com.gumid105.recipenav.recipe.service.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {

    private final RecipeService recipeService;


    @GetMapping("/all")
    public ResponseEntity<Page<Recipe>> getRecipes(@RequestParam Integer page, @RequestParam Integer size) {

        return ResponseEntity.ok(recipeService.getRecipes(page-1, size));
    }

    @GetMapping("")
    public ResponseEntity<List<RecipeDto>> getRecipesByName(@RequestParam String recipeName) {
        return ResponseEntity.ok(recipeService.getRecipesByName(recipeName));
    }

    @GetMapping("/{recipe-id}")
    public ResponseEntity<RecipeDto> getRecipeDetail(@PathVariable("recipe-id") Long recipeSeq) {
        return ResponseEntity.ok(recipeService.getRecipeDetail(recipeSeq));
    }

    @GetMapping("/reviews/{recipe-id}")
    public ResponseEntity<List<ReviewDto>> getReviews(@PathVariable("recipe-id") Long recipeSeq) {
        return ResponseEntity.ok(recipeService.getReviews(recipeSeq));
    }

    @PostMapping("/reviews/{recipe-id}")
    public ResponseEntity<ReviewDto> registerReviews(@PathVariable("recipe-id") Long recipeSeq, @Valid @RequestBody ReqReviewDto reqReviewDto ) {
        return ResponseEntity.ok(recipeService.createReview(reqReviewDto, recipeSeq));
    }

    @PutMapping("/reviews/{reviews-id}")
    public ResponseEntity<ReviewDto> updateReviews(@PathVariable("reviews-id") Long reviewSeq,@Valid @RequestBody ReqReviewDto reqReviewDto) {
        return ResponseEntity.ok(recipeService.updateReview(reqReviewDto, reviewSeq));
    }

    @DeleteMapping("/reviews/{reviews-id}")
    public Map<String, Object> deleteReviews(@PathVariable("reviews-id") Long reviewSeq) {
        Map<String, Object> response = new HashMap<>();
        if(recipeService.deleteReview(reviewSeq) > 0){
            response.put("result", "SUCCESS");
        }else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 리뷰가 없습니다.");
        }
        return response;
    }

    @GetMapping("/season-recipes/{month}")
    public ResponseEntity<List<RecipeDto>> getSeasonRecipes(@PathVariable("month") Integer month) {

        return ResponseEntity.ok(recipeService.getSeasonRecipes(month));
    }



//    @GetMapping("/recommendation?minPrice=<값>&maxPrice=<값>")
    @GetMapping("/recommendation")
    public ResponseEntity<List<RecipeDto>> getRecipeByPrice(@RequestParam(required = true, defaultValue = "1") Integer minPrice, @RequestParam(required = true, defaultValue = "1") Integer maxPrice) {
        return ResponseEntity.ok(recipeService.getRecipeByPrice(minPrice, maxPrice));
    }

    @GetMapping("/similar/{recipe-seq}")
    public ResponseEntity<List<RecipeDto>> getSimilarRecipes(@PathVariable("recipe-seq") Long recipeSeq) {
        return ResponseEntity.ok(recipeService.getSimilarRecipes(recipeSeq));
    }

    @GetMapping("/daily")
    public ResponseEntity<List<RecipeDto>> getDailyRecipes() {
        return ResponseEntity.ok(recipeService.getDailyRecipes());
    }

    @Scheduled(cron = "0 5 2 * * MON-FRI")
    @PutMapping("/price")
    public Map<String, Object> updatePrice() {
        log.info("updatePrice 실행" + LocalDateTime.now());
        Map<String, Object> response = new HashMap<>();
        if (recipeService.updatePrice()>0){
            response.put("result", "SUCCESS");
        }else {
            response.put("result", "FAIL");
            response.put("reason", "업데이트 실패.");
        }
        return response;
    }

    @GetMapping("/max-recipe-price")
    public Double getMaxRecipePrice() {
        return recipeService.getMaxRecipePrice();
    }
}
