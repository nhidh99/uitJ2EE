package org.example.util.impl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.example.util.api.JwtUtils;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import java.util.Date;

@Stateless
@LocalBean
public class JwtUtilsImpl implements JwtUtils {

    private static final Long JWT_EXPIRATION_TIME = 900_000L;       // 15 minutes
    private static final String JWT_SECRET = "LAPTOP_STORE";

    @Override
    public String issueToken(Integer id) {
        return Jwts.builder()
                .setSubject(id.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }
}