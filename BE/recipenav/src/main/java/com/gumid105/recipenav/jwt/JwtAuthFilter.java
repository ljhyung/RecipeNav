package com.gumid105.recipenav.jwt;

import com.gumid105.recipenav.jwt.util.JwtService;
import com.gumid105.recipenav.user.domain.User;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepo;

    public JwtAuthFilter(JwtService jwtService, UserRepository userRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //1.헤더에서 토큰 추출
        String token = ((HttpServletRequest) request).getHeader(JwtProperties.JWT_ACESS_NAME);
        if (token.startsWith("Bearer")){
            token = token.substring(7);
        }

        try{
            UserDto userDto =  jwtService.ParseJwt(token);

            if(userDto == null || userDto.getUserSeq() == null || !StringUtils.hasLength(userDto.getUserId())){
                log.info("jwt 파싱에 성공하였으나 필요정보 부족 :: 요청자 {}",request.getRemoteHost());
                return;//이 경우는 그냥 넘어가게 하여 필터 뒷단의 판단에 맡긴다.
            }

            //## DB에 해당하는 유저가 있는지 확인 , 토큰은 유효하나, DB에사용자가 없을 수 있다.

            User user = userRepo.findByUserId(userDto.getUserId()).orElseThrow(()->{return new Exception();});
            UserDto fromDb = UserDto.of(user);
            //<====

            List<SimpleGrantedAuthority> athorities = List.of(new SimpleGrantedAuthority(fromDb.getUserRole().name()));

            //인가 과정 성공
            SecurityContextHolder.getContext()
                    .setAuthentication(new UsernamePasswordAuthenticationToken(fromDb, "", athorities));
            //컨텍스트 홀더에 어텐티케이션 토큰 등록하면 다른 필터들은 무사히 지나간다.

        }catch (Exception e){
//            e.printStackTrace();
            log.info("jwt 파싱 에러 발생 :: 요청자 {}",request.getRemoteHost());
            //이 경우는 그냥 넘어가게 하여 필터 뒷단의 판단에 맡긴다.
        }

        filterChain.doFilter(request,response);

    }
}
