package com.gumid105.recipenav.domain.ingredient.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.domain.user.domain.UserIngredient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ing_seq")
    private Long ingSeq;

    private String ingName;
    private String ingDescription;
    private String ingMinCost;
    private String ingMaxCost;
    private String ingAvgCost;
    private String ingExDate;
    private Integer ingCalorie;
    private String ingSeason;
    private String ingCategory;

    @JsonManagedReference
    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserIngredient> userIngredients = new ArrayList<>();
}
