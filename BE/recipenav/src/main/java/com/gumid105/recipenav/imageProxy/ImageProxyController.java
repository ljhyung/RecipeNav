package com.gumid105.recipenav.imageProxy;

import io.jsonwebtoken.lang.Strings;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;

@Controller
@RequestMapping("/proxy")
@Slf4j
public class ImageProxyController {

    @GetMapping(value = "/img",produces = {MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
    public void createFile(@RequestPart(name = "img-url",required = false) String imgUrl, HttpServletResponse response) throws IOException, InterruptedException {
        log.info("이미지 프록시 요청 : {}",imgUrl);
        if(!Strings.hasLength(imgUrl)){
            return;
        }
        byte[] bytes =  WebClient.create(imgUrl).get().retrieve().bodyToMono(byte[].class).block();

        //stream.doOnNext(dataBuffer -> System.out.println(dataBuffer.read()));

        OutputStream out= response.getOutputStream();
        out.write(bytes);

        //DataBufferUtils.write(stream,out);
        log.info("이미지 정상 반환 : {}",bytes.length);

    }
}
