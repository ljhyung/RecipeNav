package com.gumid105.auth.user;

import com.gumid105.auth.jwt.JwtService;
import com.gumid105.auth.oauth.OAuthAttribute;
import com.gumid105.auth.oauth.OauthTokenValidateService;
import com.gumid105.auth.oauth.dto.AccessTokenDto;
import com.gumid105.auth.oauth.req.AccessDto;
import com.gumid105.auth.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class UserController {


    private final OauthTokenValidateService oauthTokenValidateService;
    private final UserService userService;
    private final JwtService jwtService;

    /**
     * 사용자가 준 임시토큰을 검증하고 액세스 토큰을 발급한다.
     *
     * @param providerName oauth 서비스 제공자
     * @param accessDto    제공자부터 받은 임시 code DTO
     * @return 액세스 토큰과 성공 여부
     */
    @GetMapping("/oauth/authentication/{provider_name}")
    public ResponseEntity<?> login(@PathVariable("provider_name") String providerName, AccessDto accessDto, HttpServletRequest request) {
        //1.넘어온 코드를 검증한다.
        String code = request.getParameter("code");
        String state = request.getParameter("state");

        log.info("{} iP에서 {} 로그인 시도", request.getRemoteHost(), providerName);
        log.info("{}", request.getRequestURI());

        Map<String,Object> response = new HashMap();

        response.put("isSuccess",0);
        response.put("data","");

        try {


            OAuthAttribute oAuthAttribute = oauthTokenValidateService.validateToken(providerName, accessDto);

            //성공이라면 oAuthAttribute에는 유니크한 Id가 넘어올 것이다.
            //실패라면 userId는 null이다.

            //2.유저 확인 , 생성 및 정보 가져오기
            log.info("{} ip에서 {} 로그인 시도의 결과 => {}", request.getRemoteHost(), providerName, oAuthAttribute.getId() == null ? oAuthAttribute.getId().length() : -1);

            UserDto userDto = userService.authenticationProcess(oAuthAttribute);

            //3.유저 정보를 통한 서버 토큰 생성
            AccessTokenDto AccessTokenDto = jwtService.generateAccessToken(userDto);
            response.put("isSuccess",1);
            response.put("data",AccessTokenDto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    }

    @PostMapping("/oauth/authentication/{provider_name}")
    public ResponseEntity<?> loginPost(@PathVariable("provider_name") String providerName, @RequestBody AccessDto accessDto, HttpServletRequest request) {
        return login(providerName, accessDto, request);
    }
}
