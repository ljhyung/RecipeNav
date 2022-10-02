package com.gumid105.recipenav.imageProxy;

import com.gumid105.recipenav.config.RedisConfig;
import io.jsonwebtoken.lang.Strings;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.time.Duration;

@Controller
@RequestMapping("/proxy")
@Slf4j
@RequiredArgsConstructor
public class ImageProxyController {

    private  final WebClient.Builder builder;
    private final RedisTemplate<String,byte[]> redisTemplate;

    @GetMapping(value = "/img",produces = {MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
    public void createFile(@RequestParam(name = "img-url",required = false) String imgUrl, HttpServletResponse response) throws IOException, InterruptedException {
        log.info("이미지 프록시 요청 : {}",imgUrl);
        if(!Strings.hasLength(imgUrl)){
            return;
        }


        ValueOperations<String,byte[]> valueOperations = redisTemplate.opsForValue();

        byte[] imageByte = valueOperations.get(RedisConfig.IMAGE+imgUrl);

        if(imageByte == null){
            log.info("이미지 직접 요청 : {}",imgUrl);

            imageByte =  builder.baseUrl(imgUrl).build().get().retrieve().bodyToMono(byte[].class).block();

            try {
                valueOperations.set(RedisConfig.IMAGE+imgUrl,imageByte, Duration.ofHours(1));
            }catch (Exception e){
                log.info("Redis 데이터 저장 오류 ; {}", e);
            }
        }else {
            log.info("이미지 레디스 캐싱 : {}",imgUrl);
        }
        //stream.doOnNext(dataBuffer -> System.out.println(dataBuffer.read()));

        OutputStream out= response.getOutputStream();
        out.write(imageByte);




        //DataBufferUtils.write(stream,out);
        log.info("이미지 정상 반환 : {}",imageByte.length);

    }
}
