package com.gumid105.recipenav.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gumid105.recipenav.jwt.dto.AccessTokenDto;
import com.gumid105.recipenav.jwt.util.JwtService;
import com.gumid105.recipenav.oauth.req.AccessDto;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuthLoginCodeValidateFilter extends GenericFilterBean {

    private final AntPathMatcher pathMatcher = new AntPathMatcher();
    private final ObjectMapper objectMapper;
    private final OauthTokenValidateService oauthTokenValidateService;
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        try {

            //형 변환을 통한, 기능 확장
            boolean result = doFilter((HttpServletRequest) request, (HttpServletResponse) response);

            if (result ) {
                //저 위의 메소드에서 서버가 요청자에게 이미 전송을 하였다면 더는 전송 할 수 없음으로 요청프로세스를 중단시킨다.
                return;
            }
        } catch (Exception e) {
            Map<String,Object> responseMap = new HashMap();
            log.info("로그인 요청 에러 : {}",e.getMessage());
            responseMap.put("isSuccess",0);
            responseMap.put("data","");
            return;
        }
        chain.doFilter(request, response);

    }


    private boolean doFilter(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String uri = request.getServletPath();

        if (!pathMatcher.match("/oauth/authentication/*", uri)) {
            return false;
        } //사용자의 요청이 로그인을 위한 요청이였는지 확인한다.

        log.info("사용자 로그인 요청 :: 요청자 : {}",request.getRemoteHost());
        AccessDto accessDto = objectMapper.readValue(request.getInputStream(),AccessDto.class);

        if (!StringUtils.hasLength(accessDto.getCode())) {
            // 토큰 검사 요청했으면서 토큰이 없음, state 없음
            log.info("로그인을 하기 위한 매개변수가 부족합니다. code : {} :: state : {}",accessDto.getCode(),accessDto.getState());
            throw new Exception("로그인을 하기 위한 매개변수가 부족합니다");
        }

        log.info("Oauth token 검증 시작");

        String providerName = uri.substring(uri.lastIndexOf("/") + 1);

        Map<String,Object> responseMap = new HashMap();
        responseMap.put("isSuccess",0);
        responseMap.put("data","");

        //임시토큰 발급자에게서 액세스 토큰을 얻어와 사용자 profile 조회 api를 실행하여 정보를 가져온다.
        OAuthAttribute oAuthAttribute = oauthTokenValidateService.validateToken(providerName, accessDto);
        //2.유저 확인 , 생성 및 정보 가져오기
        log.info("{} ip에서 {} 로그인 시도의 결과 => {}", request.getRemoteHost(), providerName, StringUtils.hasLength(oAuthAttribute.getId()) ? oAuthAttribute.getId().length() : -1);

        //3. 기존에 가입한 유저면 정보를 가져오고 , 아니면 생성하고 가져온다.
        UserDto userDto = userService.authenticationProcess(oAuthAttribute);

        //4.유저 정보를 통한 서버 토큰 생성
        AccessTokenDto AccessTokenDto = jwtService.generateAccessToken(userDto);
        responseMap.put("isSuccess",1);
        responseMap.put("data",AccessTokenDto);

        //결과를 요청자에게 전송한다.
        PrintWriter writer = response.getWriter();
        writer.append(objectMapper.writeValueAsString(responseMap));
        writer.flush();

        return false;

    }


}
