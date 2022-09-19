package com.gumid105.auth;

import com.gumid105.auth.jwt.JwtService;
import com.gumid105.auth.user.dto.UserDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class AuthApplicationTests {

	@Autowired
	JwtService jwtService;

	String token = "eyJraWQiOiJrZXkyIiwidHlwZSI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJyZWNpcGVuYXYiLCJhdWQiOiJST0xFX1VTRVIiLCJpYXQiOjE2NjMxMzEwODcsImV4cCI6MTY2MzE3NDI4Nywic3ViIjoidXNlciIsImlzTmV3VXNlciI6MCwidXNlcklkIjoiVUxibDZuM0VIZzZzYUI1dTBjYjQ4MmZQZzZVLXA3R0ZJWjF0RG1RNmpTTSIsInVzZXJTZXEiOjF9.zm5I4k5HKcC7jaWHlITk3NeRIv-8lnVcpbYvq-dBkRw";

	@Test
	void contextLoads() {
		System.out.println("테스트 정상 실행");
	}

	@Test
	@DisplayName("클라가 받은 액세스 토큰 검증 정상 케이스")
	void givenAccessTokenWhenValidThenSuccess(){
		UserDto user = jwtService.ParseJwt(token);

		Assertions.assertNotNull(user);
		Assertions.assertNotNull(user.getUserId());
		Assertions.assertNotNull(user.getUserSeq());
		System.out.println(user.getUserId());
		System.out.println(user.getUserSeq());

	}

}
