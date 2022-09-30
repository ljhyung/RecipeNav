package com.gumid105.recipenav.user.domain;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.gumid105.recipenav.oauth.OAuthAttribute;
import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.user.consant.Gender;
import com.gumid105.recipenav.user.consant.UserRole;
import com.gumid105.recipenav.user.dto.UserDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_user", schema = "recipenav")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_seq")
    private Long userSeq;

    @Column(name = "user_id", nullable = false,unique = true)
    private String userId;

    @Column(name = "user_pass", nullable = true)
    private String userPass;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "user_role", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private UserRole userRole;

    @Column(name = "user_email", nullable = true)
    private String userEmail;

    @Column(name = "user_tel")
    private String userTel;

    @Column(name = "user_age")
    private String userAge;

    @Column(name = "user_gender")
    @Enumerated(value = EnumType.STRING)
    private Gender userGender;

    @Column(name = "user_img")
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

    public User(UserDto userDto) {
        this.userId = userDto.getUserId();
        this.userSeq = userDto.getUserSeq();
        this.userName = userDto.getUserName();
        this.userRole = userDto.getUserRole();
        this.userEmail = userDto.getUserEmail();
        this.userTel = userDto.getUserTel();
        this.userAge = userDto.getUserAge();
        this.userGender = userDto.getUserGender();
        this.userImg = userDto.getUserImg();
    }


    public void updateProfile (String userName, String userEmail, String userTel, String userAge, Gender userGender, String userImg){
        this.userName = userName;
        this.userAge = userAge;
        this.userGender = userGender;
    }
}
