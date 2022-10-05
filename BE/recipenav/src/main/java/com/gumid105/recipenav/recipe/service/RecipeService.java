package com.gumid105.recipenav.recipe.service;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.domain.IngredientPriceLog;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.domain.RecipeIngredient;
import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.dto.ReqReviewDto;
import com.gumid105.recipenav.recipe.dto.ReviewDto;
import com.gumid105.recipenav.recipe.repository.RecipeIngredientRepository;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import com.gumid105.recipenav.recipe.repository.ReviewRepository;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final IngredientRepository ingredientRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;

    public Page<Recipe> getRecipes(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page,size);
        Page<Recipe> recipePage = recipeRepository.findAll(pageRequest);
//        List<Recipe> recipeList = recipePage.getContent();
        return recipePage;
    }

    public List<RecipeDto> getRecipesByName(String recipeName){
        List<Recipe> recipeList = recipeRepository.findRecipesByRecNameContaining(recipeName);
        return RecipeDto.ofList(recipeList);
    }


    public List<RecipeDto> getSimilarRecipes(Long recipeSeq){
        List<Recipe> recipeList = recipeRepository.findRecipesBySimilarity(recipeSeq);
        return RecipeDto.ofList(recipeList);
    }

    public RecipeDto getRecipeDetail(Long seq){
        Optional<Recipe> recipeOptional = recipeRepository.findById(seq);
        Recipe recipe = recipeOptional.get();
        return RecipeDto.of(recipe);
    }

    public List<RecipeDto> getRecipeByPrice(Integer minPrice, Integer maxPrice){
        List<Recipe> recipeList = recipeRepository.findRecipesByRecPriceIsBetween(minPrice.doubleValue(), maxPrice.doubleValue());
        return RecipeDto.ofList(recipeList);
    }

    public List<ReviewDto> getReviews(Long recSeq){
        List<Review> reviewList = reviewRepository.findAllByRecipe_RecSeq(recSeq);
        return ReviewDto.ofList(reviewList);
    }

    public ReviewDto createReview(ReqReviewDto reqReviewDto, Long recSeq){

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Review review = Review.builder()
                .recRevTitle(reqReviewDto.getRecRevTitle())
                .recRevContent(reqReviewDto.getRecRevContent())
                .recRevGrade(reqReviewDto.getRecRevGrade())
                .user(userRepository.findByUserId(userDto.getUserId()).get())
                .recipe(recipeRepository.findById(recSeq).get())
                .build();

        return ReviewDto.of(reviewRepository.save(review));
    }

    public ReviewDto updateReview(ReqReviewDto reqReviewDto, Long revSeq){
        Optional<Review> reviewOptional = reviewRepository.findById(revSeq);
        Review review = reviewOptional.get();
        review.updateReview(reqReviewDto.getRecRevTitle(), reqReviewDto.getRecRevContent(), reqReviewDto.getRecRevGrade());
        return ReviewDto.of(review);
    }

    public int deleteReview(Long revSeq){
        Optional<Review> reviewOptional = reviewRepository.findById(revSeq);
        if (reviewOptional.isPresent()){
            reviewRepository.deleteById(revSeq);
            return 1;
        }
        return 0;

    }

    public List<RecipeDto> getSeasonRecipes(Integer month){
        List<Ingredient> ingredientList = ingredientRepository.findIngredientsByIngSeasonContaining(month);
        List<Recipe> recipeList = new LinkedList<>();
        for(Ingredient ingredient:ingredientList){
            List<Recipe> recipeListTemp = recipeRepository.findRecipesByIngredientName(ingredient.getIngName());
            for(Recipe recipeTemp:recipeListTemp){
                if(!recipeList.contains(recipeTemp)){
                    recipeList.add(recipeTemp);
                }
            }
        }

        return RecipeDto.ofList(recipeList);
    }


    public List<RecipeDto> getDailyRecipes(){
        List<Recipe> recipeList = recipeRepository.findRecipesByRandom();
        return RecipeDto.ofList(recipeList);
    }

    public int updatePrice(){
        for(Long i=1l;i<538;i++) {
            try {
                Double recipeCost = 0d;
                Recipe recipe = recipeRepository.findById(i).get();
                List<RecipeIngredient> recipeIngredientList = recipeIngredientRepository.findRecipeIngredientsByRecipe_RecSeq(i);
                for (RecipeIngredient ri : recipeIngredientList) {
                    recipeCost += ri.getIngPrice()* Double.parseDouble(ri.getIngAmount());
                }
                recipe.updatePrice(recipeCost);
            }catch (Exception e) {
        }

        }
        return 1;
    }


    public Double getMaxRecipePrice(){
        Optional<Recipe> optionalRecipe = recipeRepository.findFirstByOrderByRecPriceDesc();
        Recipe recipe = optionalRecipe.get();
        return recipe.getRecPrice();
    }

}
