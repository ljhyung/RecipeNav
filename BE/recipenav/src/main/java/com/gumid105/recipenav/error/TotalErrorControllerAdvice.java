package com.gumid105.recipenav.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class TotalErrorControllerAdvice {


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exceptionHadle(Exception e){
        log.warn("에러 메세지 : {}, 발생원이 : {}",e.getMessage(),e.getCause());
        return new ResponseEntity("처리 중 에러 발생",HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
