package com.gumid105.recipenav.ingredient.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.recipe.domain.RecipeIngredient;
import com.gumid105.recipenav.user.domain.UserIngredient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_ingredient", schema = "recipenav")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ing_seq")
    private Long ingSeq;

    @Column(name = "ing_name")
    private String ingName;

    @Column(name = "ing_description")
    private String ingDescription;

    @Column(name = "ing_ex_date")
    private String ingExDate;

    @Column(name = "ing_calorie")
    private Integer ingCalorie;

    @Column(name = "ing_season")
    private String ingSeason;

    @Column(name = "ing_category")
    private String ingCategory;

    @Column(name = "ing_img")
    private String ingImg;

    @Column(name = "ing_pcode")
    private String ingPCode;

    @Column(name = "ing_pscode")
    private String ingPSCode;

    @Column(name = "ing_price_rate")
    private Double ingPriceRate;

    @JsonManagedReference
    @OneToOne(mappedBy = "ingredient")
    private IngredientPrice ingredientPrice;

//    @JsonManagedReference
//    @OneToOne(mappedBy = "ingredient")
//    private RecipeIngredient recipeIngredient;

    @JsonManagedReference
    @OneToMany(mappedBy = "ingredient")
    private List<IngredientPriceLog> ingredientPriceLogList = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserIngredient> userIngredients = new ArrayList<>();



    public void updateRate (Double rate){
        this.ingPriceRate = rate;
    }
}
