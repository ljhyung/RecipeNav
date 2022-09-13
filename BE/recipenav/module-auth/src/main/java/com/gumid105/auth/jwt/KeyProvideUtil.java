package com.gumid105.auth.jwt;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Random;

@Component
@Setter
@ConfigurationProperties(prefix = "jwt")
@PropertySource(value = {"classpath:/application.yml"})
public class KeyProvideUtil {
    private Map<String,String> key;

    private final String keyPrefix = "key";
    public Pair<String,String> getRandomKey(){

        int size = key.size();
        int randomIndex = (int)((Math.random()*10000)%size); //0<= x < size

        String selectedKey =keyPrefix + randomIndex;
        String value = key.get(selectedKey);

        return new Pair<>(selectedKey,value);

    }

    public String getKeyValue(String key){
        return this.key.get(key);
    }

}
