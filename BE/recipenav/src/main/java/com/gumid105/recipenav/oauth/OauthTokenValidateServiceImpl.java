package com.gumid105.recipenav.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.gumid105.recipenav.oauth.provider.CodeValidateApi;
import com.gumid105.recipenav.oauth.provider.GoogleCodeValidator;
import com.gumid105.recipenav.oauth.provider.NaverAuthorizationCodeValidator;
import com.gumid105.recipenav.oauth.req.AccessDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@Service
public class OauthTokenValidateServiceImpl implements OauthTokenValidateService {

    Map<String, CodeValidateApi> validatorMap = null;
    ObjectMapper objectMapper = null;

    public OauthTokenValidateServiceImpl(ObjectMapper mapper, NaverAuthorizationCodeValidator naverAuthorizationCodeValidator,
                                         GoogleCodeValidator googleCodeValidator) {
        validatorMap = Map.of(
                "naver", naverAuthorizationCodeValidator, "google", googleCodeValidator
        );
        objectMapper = mapper;
    }

    @Override
    public OAuthAttribute validateToken(String providerName, AccessDto accessDto) {

        CodeValidateApi codeValidator = validatorMap.get(providerName);
        //프로바이더에 맞는 API 요청하는 인스턴스를 가져온다.


        LinkedHashMap map = codeValidator.RequestAccesToken(accessDto);
        //code를 통해 , 액세스 토큰을 얻고 사용자 정보를 얻어오는 과정을 수행한다.

        if ("naver".equals(providerName)) {
            HashMap<String, String> hashMap = (HashMap<String, String>) map.get("response");


            OAuthAttribute oAuthAttribute = OAuthAttribute.of(hashMap, "naver");
            return oAuthAttribute;
        }


        return null;

    }
}