package com.gumid105.recipenav.jwt.dto;

import lombok.Getter;

@Getter
public class AccessTokenDto {
    private String accessToken;
    private String refreshToken;

    public static AccessTokenDto onlyAccessToken(String accessToken){

        AccessTokenDto temp = new AccessTokenDto();
        temp.accessToken = accessToken;
        temp.refreshToken = "";
        return temp;
    }

}
