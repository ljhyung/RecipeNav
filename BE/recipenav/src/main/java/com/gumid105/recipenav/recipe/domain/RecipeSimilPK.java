package com.gumid105.recipenav.recipe.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

@Data
public class RecipeSimilPK implements Serializable {

    private Long recipeSeqFirst;

    private Long recipeSeqSecond;
}
