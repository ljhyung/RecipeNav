package com.gumid105.auth.jwt;

import com.gumid105.auth.oauth.dto.AccessTokenDto;
import com.gumid105.auth.user.domain.UserRole;
import com.gumid105.auth.user.dto.UserDto;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class JwtServiceImpl implements JwtService{


    private final KeyProvideUtil keyProvideUtil;

    @Override
    public AccessTokenDto generateAccessToken(UserDto userDto) {
        long nowMillis = System.currentTimeMillis();
        Date now = Timestamp.valueOf(LocalDateTime.now());
        Date expireAt =Timestamp.valueOf( LocalDateTime.now().plusHours(12));
        String iss = userDto.getUserRole() == UserRole.ROLE_USER ? UserRole.ROLE_USER.toString():UserRole.ROLE_ADMIN.toString();

        Pair<String,String> keyPair = getKeyPair();

        Map<String, Object> header = new HashMap<>();
        header.put("type","JWT");
        header.put("alg","HS256");
        header.put("key",keyPair.getFirst());

        Map<String,Object> claims = new HashMap<>();
        claims.put("userSeq","");
        claims.put("userId","");
        claims.put("isNewUser",userDto.getIsNewUser());




       String jwtString =  Jwts.builder()
                .setHeader( header)
                .setIssuer("recipenav")
                .setAudience(iss)
                .setIssuedAt(now)
                .setExpiration(expireAt)
                .setSubject("user")
                .addClaims(claims)
                .signWith(Keys.hmacShaKeyFor(keyPair.getSecond().getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
               .compact();



        return AccessTokenDto.onlyAccessToken(jwtString);
    }

    private Pair<String,String> getKeyPair(){

        return keyProvideUtil.getRandomKey();

    }

}
