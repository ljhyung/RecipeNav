package com.gumid105.recipenav.ingredient.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.user.domain.UserIngredient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_ingredient", schema = "recipenav")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ing_seq")
    private Long ingSeq;

    @Column(name = "ing_name")
    private String ingName;

    @Column(name = "ing_description")
    private String ingDescription;

    @Column(name = "ing_ex_date")
    private String ingExDate;

    @Column(name = "ing_calorie")
    private Integer ingCalorie;

    @Column(name = "ing_season")
    private String ingSeason;

    @Column(name = "ing_category")
    private String ingCategory;

    @Column(name = "ing_img")
    private String ingImg;

    @JsonManagedReference
    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserIngredient> userIngredients = new ArrayList<>();
}
