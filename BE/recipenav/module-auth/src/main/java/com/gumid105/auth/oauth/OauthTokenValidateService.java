package com.gumid105.auth.oauth;

import com.gumid105.auth.oauth.req.AccessDto;

public interface OauthTokenValidateService {
    OAuthAttribute validateToken(String providerName, AccessDto accessDto);
}
