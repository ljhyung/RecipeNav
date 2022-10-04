package com.gumid105.recipenav.recipe.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.user.domain.UserRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_recipe", schema = "recipenav")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_seq")
    private Long recSeq;

    @Column(name = "rec_name")
    private String recName;

    @Column(name = "rec_step")
    private String recStep;

    @Column(name = "rec_cost")
    private String recCost;

    @Column(name = "rec_code")
    private String recCode;

    @Column(name = "rec_summary")
    private String recSummary;

    @Column(name = "cate_code")
    private String cateCode;

    @Column(name = "cate_frac")
    private String cateFrac;

    @Column(name = "food_code")
    private String foodCode;

    @Column(name = "food_frac")
    private String foodFrac;

    @Column(name = "cooking_time")
    private String cookingTime;

    @Column(name = "rec_calorie")
    private String recCalorie;

    @Column(name = "rec_amount")
    private String recAmount;

    @Column(name = "rec_level")
    private String recLevel;

    @Column(name = "rec_ing_frac")
    private String recIngFrac;

    @Column(name = "rec_price")
    private Double recPrice;

    @Column(name = "rec_img")
    private String recImg;



    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Review> reviews = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<UserRecipe> userRecipes = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<RecipeIngredient> recipeIngredientList = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<RecipeProcess> recipeProcessList = new ArrayList<>();


    public void updatePrice (Double price){
        this.recPrice = price;
    }
}
