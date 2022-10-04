package com.gumid105.recipenav.recipe.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.ingredient.domain.Ingredient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_recipe_ingredient", schema = "recipenav")
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_ing_seq")
    private Long recIngSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_seq")
    @JsonBackReference
    private Recipe recipe;

    @Column(name = "rec_name")
    private String recName;

    @Column(name = "ing_name")
    private String ingName;

    @Column(name = "ing_amount")
    private String ingAmount;

    @Column(name = "ing_type")
    private String ingType;

    @Column(name = "ing_price")
    private Double ingPrice;

//    @JsonManagedReference
//    @OneToOne(mappedBy = "recipeIngredient")
//    private Ingredient ingredient;
}
