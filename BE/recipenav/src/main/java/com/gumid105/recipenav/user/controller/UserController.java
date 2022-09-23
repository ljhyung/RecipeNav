package com.gumid105.recipenav.user.controller;

import com.gumid105.recipenav.exception.CustomErrorException;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import com.gumid105.recipenav.user.domain.UserRecipe;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.repository.UserRepository;
import com.gumid105.recipenav.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
    public ResponseEntity<?> updateProfile() {
        return null;
    }

    @GetMapping("")
    public ResponseEntity<?> getProfile() {
        return null;
    }

    @GetMapping("/ingredients")
    public ResponseEntity<?> getMyIngredients() {
        return null;
    }

    @PostMapping("/ingredients/{ingredients-id}")
    public ResponseEntity<?> addMyIngredient(@PathVariable Long ingredientsSeq) {
        return null;
    }

    @DeleteMapping("/ingredients/{ingredients-id}")
    public ResponseEntity<?> deleteMyIngredient(@PathVariable Long ingredientsSeq) {
        return null;
    }

    @GetMapping("/recipes")
    public ResponseEntity<List<Recipe>> getMyRecipes() {
        List<Recipe> recipeList = userServiceImpl.getMyRecipes();
        return ResponseEntity.ok(recipeList);
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
        if(userServiceImpl.deleteRecipeFromUser(recipesSeq) >0){
            response.put("result", "SUCCESS");
        }else{
            response.put("result", "FAIL");
        }
        return response;
    }


}
