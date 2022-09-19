package com.gumid105.recipenav.oauth.provider;


import com.gumid105.recipenav.oauth.req.AccessDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@Component
public class NaverAuthorizationCodeValidator implements CodeValidateApi {

    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String tokenRequestUrl;
    @Value("${spring.security.oauth2.client.provider.naver.user-info-uri}")
    private String userInfoUri;
    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String clientSecret;

    public LinkedHashMap RequestAccesToken(AccessDto authCode) {

        MultiValueMap<String, String> formData  = new LinkedMultiValueMap<>();

        formData.add("grant_type", "authorization_code");
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("code", authCode.getCode());
        formData.add("state", authCode.getState());

        String url = UriComponentsBuilder.fromUriString(tokenRequestUrl)
                .queryParams(formData)
                .toUriString();

        Map<String,String> res =  WebClient.create(url).get().retrieve().bodyToMono(HashMap.class).block();
        log.info("{}",res);
        /*
        WebClient webClient = WebClient
                .builder()
                .defaultHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8")
                .baseUrl(tokenRequestUrl)
                .build();
        log.info("네이버 액세스 토큰 API 호출");
        Map responseMap = webClient.
                post()
                .body(BodyInserters.fromFormData(formData))
                .retrieve()
                .bodyToMono(HashMap.class).block();
  */
        //accessToken을 얻어온다.
        //여기까지 성공했다는 것은, 클라쪽에서 보내분 인증코드가 유효했다는 것을 증명한다.
        //우리는 네이버 oauth 서비스를 네이버 서비스를 이용하기 위해서가 아니라
        //우리 서비스의 유저관리 명목으로 사용한다.
        //여기서 멈춰도 되겠다 싶지만, 아직 유저를 특정할 방법이 없다 . 따라서 회원 프로필 조회 API를 사용해야한다.
        LinkedHashMap userInfo = WebClient.builder().baseUrl(userInfoUri).defaultHeaders(httpHeaders -> httpHeaders.add("Authorization", "Bearer " + res.get("access_token")))
                .build().get().retrieve().bodyToMono(LinkedHashMap.class).block();

        return userInfo;

    }

}
