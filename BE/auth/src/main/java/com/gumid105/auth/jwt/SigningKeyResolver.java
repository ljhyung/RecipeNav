package com.gumid105.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.SigningKeyResolverAdapter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
@RequiredArgsConstructor
public class SigningKeyResolver extends SigningKeyResolverAdapter {
    private final com.gumid105.recipenav.jwt.util.KeyProvideUtil keyProvideUtil;
    @Override
    public Key resolveSigningKey(JwsHeader jwsHeader, Claims claims) {
        String kid = jwsHeader.getKeyId();
        if (kid == null)
            return null;
        Key signKey = keyProvideUtil.getKeyValue(kid);

        return signKey;
    }
}
