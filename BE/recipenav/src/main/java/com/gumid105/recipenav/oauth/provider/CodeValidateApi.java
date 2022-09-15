package com.gumid105.recipenav.oauth.provider;

import com.gumid105.recipenav.oauth.req.AccessDto;

import java.util.LinkedHashMap;

public interface CodeValidateApi {
    public LinkedHashMap RequestAccesToken(AccessDto authCode);
}
