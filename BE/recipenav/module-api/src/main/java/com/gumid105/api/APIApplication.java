package com.gumid105.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

//SpringBootApplication은 웹 서버를 실행시키는 어노테이션이고 자기 밑에 하위 패키지를 전부 스캔한다.
@RestController
@SpringBootApplication
public class APIApplication {

    public static void main(String[] args){
        SpringApplication.run(APIApplication.class,args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s! i'm API 서버", name);
    }
}
