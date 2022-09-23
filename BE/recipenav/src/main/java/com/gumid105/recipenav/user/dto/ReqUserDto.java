package com.gumid105.recipenav.user.dto;

import com.gumid105.recipenav.user.consant.Gender;
import com.gumid105.recipenav.user.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqUserDto {
    private String userName;
    private String userEmail;
    private String userTel;
    private String userAge;
    private Gender userGender;
    private String userImg;

    public static ReqUserDto of(User user){
        ReqUserDto reqUserDto = new ReqUserDto();
        reqUserDto.userName = user.getUserName();
        reqUserDto.userEmail = user.getUserEmail();
        reqUserDto.userTel = user.getUserTel();
        reqUserDto.userAge = user.getUserAge();
        reqUserDto.userGender = user.getUserGender();
        reqUserDto.userImg = user.getUserImg();

        return reqUserDto;
    }
}
