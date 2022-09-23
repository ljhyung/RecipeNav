package com.gumid105.recipenav.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.ingredient.domain.Ingredient;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_user_ingredient", schema = "recipenav")
public class UserIngredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userIngSeq;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ing_seq")
    private Ingredient ingredient;


    public UserIngredient(User user, Ingredient ingredient){
        this.user = user;
        this.ingredient = ingredient;
    }
}
