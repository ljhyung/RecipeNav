package com.gumid105.recipenav.user.domain;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.oauth.OAuthAttribute;
import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.user.consant.Gender;
import com.gumid105.recipenav.user.consant.UserRole;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = true)
    private String userPass;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserRole userRole;

    @Column(nullable = true)
    private String userEmail;

    private String userTel;
    private String userAge;
    @Enumerated(value = EnumType.STRING)
    private Gender userGender;
    private String userImg;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserIngredient> userIngredients = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserRecipe> userRecipes = new ArrayList<>();


    public static User of(OAuthAttribute oAuthAttribute){
        User temp = new User();
        temp.userId = oAuthAttribute.getId();
        temp.userEmail = oAuthAttribute.getEmail();
        temp.userGender = oAuthAttribute.getGender();
        temp.userName = oAuthAttribute.getName();
        temp.userTel = oAuthAttribute.getMobile();

        temp.userAge = "0";
        temp.userRole = UserRole.ROLE_USER;
        return temp;
    }
}
