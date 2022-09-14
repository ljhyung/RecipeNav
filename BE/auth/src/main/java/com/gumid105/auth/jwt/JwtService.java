package com.gumid105.auth.jwt;


import com.gumid105.auth.oauth.dto.AccessTokenDto;
import com.gumid105.auth.user.dto.UserDto;


public interface JwtService {

    public AccessTokenDto generateAccessToken(UserDto userDto);
    public UserDto ParseJwt(String jwtTokenString);
}
