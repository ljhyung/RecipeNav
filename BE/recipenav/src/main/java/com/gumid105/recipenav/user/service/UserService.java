package com.gumid105.recipenav.user.service;


import com.gumid105.recipenav.oauth.OAuthAttribute;
import com.gumid105.recipenav.user.dto.UserDto;

public interface UserService {
     UserDto authenticationProcess(OAuthAttribute id);
     UserDto getUserInfo(UserDto userDto);
}
