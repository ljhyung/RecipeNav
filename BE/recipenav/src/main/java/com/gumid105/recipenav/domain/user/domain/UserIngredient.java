package com.gumid105.recipenav.domain.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.domain.ingredient.domain.Ingredient;
import com.gumid105.recipenav.domain.ingredient.domain.Ingredient;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long key;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ing_seq")
    private Ingredient ingredient;
}
