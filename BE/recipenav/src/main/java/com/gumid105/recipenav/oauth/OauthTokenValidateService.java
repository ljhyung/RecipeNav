package com.gumid105.recipenav.oauth;


import com.gumid105.recipenav.oauth.req.AccessDto;

public interface OauthTokenValidateService {
    OAuthAttribute validateToken(String providerName, AccessDto accessDto);
}
