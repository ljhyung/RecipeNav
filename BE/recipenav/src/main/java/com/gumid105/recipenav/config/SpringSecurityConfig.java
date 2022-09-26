package com.gumid105.recipenav.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gumid105.recipenav.jwt.JwtAuthFilter;
import com.gumid105.recipenav.jwt.util.JwtService;
import com.gumid105.recipenav.oauth.OAuthLoginCodeValidateFilter;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Configuration
public class SpringSecurityConfig {

    private final JwtService jwtService;
    private final ObjectMapper objectMapper;
    private final OAuthLoginCodeValidateFilter oAuthLoginCodeValidateFilter;
    private final UserRepository userRepo;
    //시큐리티 설정 메인
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.cors().configurationSource(corsConfigurationSource());
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);//jwt를 사용하기에 상태가 없음
        http.httpBasic().disable(); // 헤더에 username,password 로그인 사용 불가
        http.csrf().disable(); // csrf 보안 사용 안함
        http.anonymous().disable(); // 익명 사용자 허용 x

        http.addFilterBefore(new JwtAuthFilter(jwtService, userRepo),
                UsernamePasswordAuthenticationFilter.class); //기본 인증단계전 인가를 검사하자.

        //인가 필터로 가기전 사용자의 요청이 인증을 위한 것이였을 수 있다. 따라서 인가 전에 실행한다.
        http.addFilterBefore(oAuthLoginCodeValidateFilter,JwtAuthFilter.class);

        http.authorizeRequests((authz) -> {
            authz.anyRequest().permitAll();//우선은 모두 인가로 설정
        });

        //AccessDeniedHandler는 서버에 요청을 할 때 액세스가 가능한지 권한을 체크후 액세스 할 수 없는 요청을 했을시 동작된다.
        http.exceptionHandling().accessDeniedHandler(new AccessDeniedHandler() {
            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response,
                               AccessDeniedException accessDeniedException) throws IOException, ServletException {
                log.info("권한 인가 실패 : {}", accessDeniedException.getMessage());

            }
        });

        //AuthenticationEntryPoint는 인증이 되지않은 유저가 요청을 했을때 동작된다.
        http.exceptionHandling().authenticationEntryPoint(new AuthenticationEntryPoint() {
            @Override
            public void commence(HttpServletRequest request, HttpServletResponse response, org.springframework.security.core.AuthenticationException authException) throws IOException, ServletException {
                log.info("인가 실패 : {}", authException.getMessage());

                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                // json 리턴 및 한글깨짐 수정.
                response.setContentType("application/json;charset=utf-8");

                Map<String,Object> responseMap = new HashMap<>();

                String message = "잘못된 접근입니다";
                responseMap.put("isSuccess", 0);
                responseMap.put("data", "토큰이 필요한 요청에 토큰이 포함되어있지 않습니다.");

                PrintWriter out = response.getWriter();
                out.print(objectMapper.writeValueAsString(responseMap));
            }


        });


        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);
        //url기반 cors 컨피규레이션 ,모든 url에 모든 오리진,헤더값,메소드 허용,쿠키도 일단 허용
        return source;
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("/swagger-ui/**", "/v3/api-docs/**", "/proxy/**");
    }

}
