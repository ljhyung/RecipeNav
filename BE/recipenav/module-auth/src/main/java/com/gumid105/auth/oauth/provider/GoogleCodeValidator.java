package com.gumid105.auth.oauth.provider;

import com.gumid105.auth.oauth.req.AccessDto;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;

@Component
public class GoogleCodeValidator implements CodeValidateApi {
    @Override
    public LinkedHashMap RequestAccesToken(AccessDto authCode) {
        return null;
    }
}
