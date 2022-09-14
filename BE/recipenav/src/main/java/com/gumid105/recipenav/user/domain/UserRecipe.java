package com.gumid105.recipenav.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.recipe.domain.Recipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long key;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_seq")
    private Recipe recipe;
}
