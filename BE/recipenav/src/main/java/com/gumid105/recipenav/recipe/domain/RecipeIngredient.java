package com.gumid105.recipenav.recipe.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeIngredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_ing_seq")
    private Long recIngSeq;

    private String rec_name;
    private String ing_name;
    private String ing_amount;
    private String ing_type;
}
