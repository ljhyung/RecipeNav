package com.gumid105.auth.user;

import com.gumid105.auth.oauth.OAuthAttribute;
import com.gumid105.auth.user.dto.UserDto;

public interface UserService {
     UserDto authenticationProcess(OAuthAttribute id);
}
