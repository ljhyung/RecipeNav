package com.gumid105.recipenav.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.recipe.domain.Recipe;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_user_recipe", schema = "recipenav")
public class UserRecipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userRecipeSeq;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_seq")
    private Recipe recipe;

    public UserRecipe(User user, Recipe recipe) {
        this.user = user;
        this.recipe = recipe;
    }

    public Long getUserRecipeSeq() {
        return userRecipeSeq;
    }

}
