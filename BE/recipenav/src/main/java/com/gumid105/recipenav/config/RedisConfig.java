package com.gumid105.recipenav.config;

import io.lettuce.core.ReadFrom;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
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
        LettuceClientConfiguration clientConfiguration = LettuceClientConfiguration.builder().
                readFrom(ReadFrom.REPLICA_PREFERRED ).build();

        RedisClusterConfiguration redisClusterConfiguration = new RedisClusterConfiguration();
        redisClusterConfiguration.clusterNode("j7d105.p.ssafy.io",6379);
        redisClusterConfiguration.clusterNode("j7d105.p.ssafy.io",7000);
        redisClusterConfiguration.clusterNode("j7d105.p.ssafy.io",7001);
        redisClusterConfiguration.clusterNode("j7d105.p.ssafy.io",7002);
        redisClusterConfiguration.clusterNode("j7d105.p.ssafy.io",7003);
        redisClusterConfiguration.clusterNode("j7d105.p.ssafy.io",7004);

        LettuceConnectionFactory lf = new LettuceConnectionFactory(redisClusterConfiguration,clientConfiguration);
        lf.afterPropertiesSet();
        return  lf;
    }
    @Bean
    public RedisTemplate<?, ?> redisTemplate() {
        RedisTemplate<String, byte[]> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());

        return redisTemplate;
    }
}
