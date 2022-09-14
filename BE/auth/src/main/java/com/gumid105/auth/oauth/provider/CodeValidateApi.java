package com.gumid105.auth.oauth.provider;

import com.gumid105.auth.oauth.req.AccessDto;

import java.util.LinkedHashMap;

public interface CodeValidateApi {
    public LinkedHashMap RequestAccesToken(AccessDto authCode);
}
