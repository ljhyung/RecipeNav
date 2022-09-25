package com.gumid105.recipenav.jwt.util;

import com.gumid105.recipenav.jwt.dto.AccessTokenDto;
import com.gumid105.recipenav.user.consant.UserRole;
import com.gumid105.recipenav.user.dto.UserDto;
import io.jsonwebtoken.SigningKeyResolver;
import io.jsonwebtoken.*;
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
public class JwtServiceImpl implements JwtService {


    private final KeyProvideUtil keyProvideUtil;

    private final SigningKeyResolver signingKeyResolver;
    public UserDto ParseJwt(String jwtTokenString){

        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKeyResolver(signingKeyResolver)
                .build();
        Jws<Claims> jwt = jwtParser.parseClaimsJws(jwtTokenString);
        /*
MalformedJwtException – if the specified JWT was incorrectly constructed (and therefore invalid). Invalid JWTs should not be trusted and should be discarded.
SignatureException – if a JWS signature was discovered, but could not be verified. JWTs that fail signature validation should not be trusted and should be discarded.
ExpiredJwtException – if the specified JWT is a Claims JWT and the Claims has an expiration time before the time this method is invoked.
IllegalArgumentException – if the specified string is null or empty or only whitespace.
        * */

        String userId = (String)jwt.getBody().get("userId");
        Long userSeq = Long.parseLong ((String)jwt.getBody().get("userSeq").toString());
        UserDto userDto = new UserDto();
        userDto.setUserId(userId);
        userDto.setUserSeq(userSeq);

        return userDto;
    }




    @Override
    public AccessTokenDto generateAccessToken(UserDto userDto) {
        long nowMillis = System.currentTimeMillis();
        Date now = Timestamp.valueOf(LocalDateTime.now());
        //Date expireAt =Timestamp.valueOf( LocalDateTime.now().plusHours(12));
        String iss = userDto.getUserRole() == UserRole.ROLE_USER ? UserRole.ROLE_USER.toString():UserRole.ROLE_ADMIN.toString();

        Pair<String,String> keyPair = getKeyPair();

        Map<String, Object> header = new HashMap<>();
        header.put("type","JWT");
        header.put("alg","HS256");
        header.put("kid",keyPair.getFirst());

        Map<String,Object> claims = new HashMap<>();
        claims.put("userSeq",userDto.getUserSeq());
        claims.put("userId",userDto.getUserId());
        claims.put("isNewUser",userDto.getIsNewUser());




       String jwtString =  Jwts.builder()
                .setHeader( header)
                .setIssuer("recipenav")
                .setAudience(iss)
                .setIssuedAt(now)
               // .setExpiration(expireAt)
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
