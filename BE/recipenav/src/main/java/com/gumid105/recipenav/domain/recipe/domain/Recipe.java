package com.gumid105.recipenav.domain.recipe.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.domain.user.domain.UserRecipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_seq")
    private Long recSeq;

    private String recName;
    private String recStep;
    private String recCost;
    private String recCode;
    private String recSummary;
    private String cateCode;
    private String cateFrac;
    private String foodCode;
    private String foodFrac;
    private String cookingTime;
    private String calorie;
    private String amount;
    private String level;
    private String ingFrac;
    private String price;
    private String imgUrl;

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRecipe> userRecipes = new ArrayList<>();

}
