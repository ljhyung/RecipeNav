package com.gumid105.recipenav.user.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Data
@Entity
public class UserRecipeSimil {

    @EmbeddedId
    private UserRecipeSimilPK pk;

    @Column(name = "value")
    private Double value;


}
