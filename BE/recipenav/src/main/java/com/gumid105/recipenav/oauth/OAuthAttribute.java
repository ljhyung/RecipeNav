package com.gumid105.recipenav.oauth;

import com.gumid105.recipenav.user.consant.Gender;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class OAuthAttribute {
    private String id;
    private String name;
    private Gender gender;
    private String email;
    private String mobile;

    public static OAuthAttribute of(Map<String, String> map, String provider) {
        if ("naver".compareTo(provider) == 0) {

            OAuthAttribute temp = new OAuthAttribute();
            temp.id = map.get("id")+"/naver";
            temp.name = map.get("name");
            temp.email = map.get("email");
            temp.mobile = map.get("mobile");
            if("M".compareTo(map.get("gender")) == 0){
                temp.gender =Gender.MALE;
            }else if("F".compareTo(map.get("gender")) == 0){
                temp.gender = Gender.FEMALE;
            }else{
                temp.gender = null;
            }
            return temp;
        } else {
            return null;
        }
    }

}
