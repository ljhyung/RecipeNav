package com.gumid105.recipenav.user.controller;

import com.gumid105.recipenav.user.dto.UserDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/my-infos")
public class UserController {

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
    public ResponseEntity<?> getMyRecipes() {
        return null;
    }

    @PostMapping("/recipes/{recipes-id}")
    public ResponseEntity<?> addMyRecipe(@PathVariable Long recipesSeq) {
        return null;
    }

    @DeleteMapping("/recipes/{recipes-id}")
    public ResponseEntity<?> deleteMyRecipe(@PathVariable Long recipesSeq) {
        return null;
    }


}
