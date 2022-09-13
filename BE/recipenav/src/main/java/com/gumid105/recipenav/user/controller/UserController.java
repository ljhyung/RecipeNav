package com.gumid105.recipenav.user.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("my-infos/")
public class UserController {

    @PutMapping("")
    public ResponseEntity<> updateProfile() {
        return;
    }

    @GetMapping("")
    public ResponseEntity<> getProfile() {
        return;
    }

    @GetMapping("/ingredients")
    public ResponseEntity<> getMyIngredients() {
        return;
    }

    @PostMapping("/ingredients/{ingredients-id}")
    public ResponseEntity<> addMyIngredient(@PathVariable Long ingredientsSeq) {
        return;
    }

    @DeleteMapping("/ingredients/{ingredients-id}")
    public ResponseEntity<> deleteMyIngredient(@PathVariable Long ingredientsSeq) {
        return;
    }

    @GetMapping("/recipes")
    public ResponseEntity<> getMyRecipes() {
        return;
    }

    @PostMapping("/recipes/{recipes-id}")
    public ResponseEntity<> addMyRecipe(@PathVariable Long recipesSeq) {
        return;
    }

    @DeleteMapping("/recipes/{recipes-id}")
    public ResponseEntity<> deleteMyRecipe(@PathVariable Long recipesSeq) {
        return;
    }


}
