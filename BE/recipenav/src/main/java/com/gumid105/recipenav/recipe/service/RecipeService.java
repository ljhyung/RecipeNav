package com.gumid105.recipenav.recipe.service;

import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.domain.RecipeProcess;
import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.dto.ReqReviewDto;
import com.gumid105.recipenav.recipe.dto.ReviewDto;
import com.gumid105.recipenav.recipe.repository.RecipeProcessRepository;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import com.gumid105.recipenav.recipe.repository.ReviewRepository;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public List<RecipeDto> getRecipes(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page,size);
        List<Recipe> recipeList = recipeRepository.findAll(pageRequest).getContent();
        return RecipeDto.ofList(recipeList);
    }

    public RecipeDto getRecipeDetail(Long seq){
        Optional<Recipe> recipeOptional = recipeRepository.findById(seq);
        Recipe recipe = recipeOptional.get();
        return RecipeDto.of(recipe);
    }

    public List<RecipeDto> getRecipeByPrice(Integer minPrice, Integer maxPrice){
        List<Recipe> recipeList = recipeRepository.findRecipesByRecPriceIsBetween(minPrice, maxPrice);
        return RecipeDto.ofList(recipeList);
    }

    public List<ReviewDto> getReviews(Long recSeq){
        List<Review> reviewList = reviewRepository.findAllByRecipe_RecSeq(recSeq);
        return ReviewDto.ofList(reviewList);
    }

    public ReviewDto createReview(ReqReviewDto reqReviewDto, Long recSeq){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Review review = Review.builder()
                .recRevTitle(reqReviewDto.getRecRevTitle())
                .recRevContent(reqReviewDto.getRecRevContent())
                .recRevGrade(reqReviewDto.getRecRevGrade())
//                .user(userRepository.findByUserId(auth.getPrincipal()));
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

//        return ReviewDto.of();
    }
}