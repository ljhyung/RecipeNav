package com.gumid105.auth.user.domain;

import com.gumid105.auth.oauth.OAuthAttribute;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "t_user")
@Getter
@Setter
public class User {

    //유저 SEQ
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_seq")
    private Long userSeq;

    //아이디
    @Column(name = "user_id",nullable = false)
    private String userId;

    //비밀번호
    //@Column(name="user_pass")
    //private String userPass;

    //이름
    @Column(name = "user_name",nullable = false)
    private String userName;
    //권한
    @Enumerated(EnumType.STRING)
    @Column(name="user_role",nullable = false)
    private UserRole userRole;
    //email
    @Column(name = "user_email",nullable = false)
    private String userEmail;

    //휴대폰 번호
    @Column(name="user_tel")
    private String userTel;

    //연령
    @Column(name= "user_age")
    private Integer userAge;

    //성별
    @Enumerated(EnumType.STRING)
    @Column(name="user_gender")
    private Gender userGender;

    public static User of(OAuthAttribute oAuthAttribute){
        User temp = new User();
        temp.userId = oAuthAttribute.getId();
        temp.userEmail = oAuthAttribute.getEmail();
        temp.userGender = oAuthAttribute.getGender();
        temp.userName = oAuthAttribute.getName();
        temp.userTel = oAuthAttribute.getMobile();

        temp.userAge = 0;
        temp.userRole = UserRole.ROLE_USER;
        return temp;
    }


}
