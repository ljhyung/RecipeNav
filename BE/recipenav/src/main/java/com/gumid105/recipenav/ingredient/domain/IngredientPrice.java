package com.gumid105.recipenav.ingredient.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_ingredient_price", schema = "recipenav")
public class IngredientPrice {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ing_price_seq")
    private Long ingPriceSeq;

    @OneToOne
    @JoinColumn(name = "ing_seq")
    @JsonBackReference
    private Ingredient ingredient;

    @Column(name = "ing_date")
    private LocalDate ingDate;

    @Column(name = "ing_min_cost")
    private Integer ingMinCost;

    @Column(name = "ing_max_cost")
    private Integer ingMaxCost;

    @Column(name = "ing_avg_cost")
    private Integer ingAvgCost;
}

