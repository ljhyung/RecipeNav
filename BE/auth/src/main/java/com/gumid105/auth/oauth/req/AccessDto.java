package com.gumid105.auth.oauth.req;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessDto {
    private String code;
    private String state;
}
