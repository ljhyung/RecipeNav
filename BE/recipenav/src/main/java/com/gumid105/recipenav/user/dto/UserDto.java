package com.gumid105.recipenav.user.dto;

import com.gumid105.recipenav.user.consant.Gender;
import com.gumid105.recipenav.user.consant.UserRole;
import com.gumid105.recipenav.user.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {


    //유저 SEQ
    private Long userSeq;
    //아이디
    private String userId;
    //비밀번호
    private String userName;
    //권한
    private UserRole userRole;
    //email
    private String userEmail;
    //휴대폰 번호
    private String userTel;
    //연령
    private String userAge;
    //성별
    private Gender userGender;
    //프로필이미지
    private String userImg;

    private int isNewUser;

    public static UserDto of(User user) {
        UserDto userDto = new UserDto();
        userDto.userSeq = user.getUserSeq();
        userDto.userId = user.getUserId();
        userDto.userName = user.getUserName();
        userDto.userRole = user.getUserRole();
        userDto.userEmail = user.getUserEmail();
        userDto.userTel = user.getUserTel();
        userDto.userAge = user.getUserAge();
        userDto.userGender = user.getUserGender();
        userDto.userImg = user.getUserImg();

        return userDto;
    }
}

