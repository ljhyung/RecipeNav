package com.gumid105.auth.user.dto;

import com.gumid105.auth.user.domain.Gender;
import com.gumid105.auth.user.domain.User;
import com.gumid105.auth.user.domain.UserRole;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
    private Integer userAge;
    //성별
    private Gender userGender;

    private  int isNewUser;

    public static UserDto of(User user){
        UserDto userDto = new UserDto();
        userDto.userSeq = user.getUserSeq();
        userDto.userId = user.getUserId();
        userDto.userName = user.getUserName();
        userDto.userRole=user.getUserRole();
        userDto.userEmail = user.getUserEmail();
        userDto.userTel = user.getUserTel();
        userDto.userAge = user.getUserAge();
        userDto.userGender = user.getUserGender();

        return userDto;
    }
}


