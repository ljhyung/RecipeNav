package com.gumid105.recipenav.jwt.util;


import com.gumid105.recipenav.jwt.dto.AccessTokenDto;
import com.gumid105.recipenav.user.dto.UserDto;

public interface JwtService {

    public AccessTokenDto generateAccessToken(UserDto userDto);
    public UserDto ParseJwt(String jwtTokenString);
}
