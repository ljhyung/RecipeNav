package com.gumid105.recipenav.recipe.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@IdClass(RecipeSimilPK.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_recipe_simil", schema = "recipenav")
public class RecipeSimil {
    @Id
    @Column(name = "recipe_seq_first")
    private Long recipeSeqFirst;

    @Id
    @Column(name = "recipe_seq_second")
    private Long recipeSeqSecond;

    @Column(name = "value")
    private Double value;
}
