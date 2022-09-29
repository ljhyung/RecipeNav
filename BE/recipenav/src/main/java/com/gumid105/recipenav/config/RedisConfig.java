package com.gumid105.recipenav.config;

import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@EnableCaching
@Configuration
public class RedisConfig {

    public static String IMAGE = "proxy-img:";
    public static String TOPGAINER = "top-gainer";
    public static String TOPLOSER = "top-loser";
    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory("j7d105.p.ssafy.io", 6379);
    }
    @Bean
    public RedisTemplate<?, ?> redisTemplate() {
        RedisTemplate<String, byte[]> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }
}
