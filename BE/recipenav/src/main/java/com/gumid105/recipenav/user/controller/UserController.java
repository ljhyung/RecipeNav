package com.gumid105.recipenav.user.controller;


import com.gumid105.recipenav.exception.CustomErrorException;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import com.gumid105.recipenav.user.domain.UserRecipe;
import com.gumid105.recipenav.user.dto.ReqUserDto;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/my-infos")
public class UserController {


    private final UserServiceImpl userServiceImpl;
    private final RecipeRepository recipeRepository;

    @PutMapping("")
    public ResponseEntity<UserDto> updateProfile(@Valid @RequestBody ReqUserDto reqUserDto) {
        return ResponseEntity.ok(userServiceImpl.updateProfile(reqUserDto));
    }

    @GetMapping("")
    public ResponseEntity<UserDto> getProfile() {
        return ResponseEntity.ok(userServiceImpl.getProfile());
    }

    @GetMapping("/ingredients")
    public ResponseEntity<List<IngredientDto>> getMyIngredients() {
        return ResponseEntity.ok(userServiceImpl.getMyIngredients());
    }

    @PostMapping("/ingredients/{ingredients-id}")
    public Map<String, Object> addMyIngredient(@PathVariable("ingredients-id") Long ingredientsSeq) {
        Map<String, Object> response = new HashMap<>();
        // 중복 체크 해줘야한다
        if(userServiceImpl.addMyIngredient(ingredientsSeq) > 0){
            response.put("result", "SUCCESS");
        }else {
            response.put("result", "FAIL");
            response.put("reason", "이미 추가한 식재료입니다");
        }
        return response;
    }

    @DeleteMapping("/ingredients/{ingredients-id}")
    public Map<String, Object> deleteMyIngredient(@PathVariable("ingredients-id") Long ingredientsSeq) {
        Map<String, Object> response = new HashMap<>();
        if(userServiceImpl.deleteMyIngredient(ingredientsSeq) > 0){
            response.put("result", "SUCCESS");
        }else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 리뷰가 없습니다.");
        }
        return response;
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<RecipeDto>> getMyRecipes() {
        return ResponseEntity.ok(userServiceImpl.getMyRecipes());
    }

    @PostMapping("/recipes/{recipes-id}")
    public ResponseEntity<?> addMyRecipe(@PathVariable("recipes-id") Long recipesSeq) {
        System.out.println("레시피 유저한테  컨트롤러!");

        Recipe recipe = recipeRepository.findById(recipesSeq).orElseThrow(
                ()->new CustomErrorException("레시피가 존재하지 않습니다.")
        );
        UserRecipe data = userServiceImpl.addRecipeToUser(recipe);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/recipes/{recipes-id}")
    public Map<String, Object> deleteMyRecipe(@PathVariable("recipes-id") Long recipesSeq) {
        Map<String, Object> response = new HashMap<>();
        int result = userServiceImpl.deleteRecipeFromUser(recipesSeq);
        if( result>0){
            response.put("삭제한 레시피 수", result);
            response.put("result", "SUCCESS");
        }else{
            response.put("result", "FAIL");
        }
        return response;
    }

    @GetMapping("/recipes/similar")
    public ResponseEntity<?> getRecipeBySimilarUser(){

        Map<String, Object> response = new HashMap<>();
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        List<RecipeDto> recipes = userServiceImpl.getSimilarRecipeByUserLike(userDto.getUserSeq());

        response.put("recipes",recipes);
        response.put("count",recipes.size());
        response.put("msg","사용자 기반으로 추천된 레시피를 반환합니다.");

        return new ResponseEntity<Map<String,Object>>(response, HttpStatus.OK);
    }
}
