package com.clinica.backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET =
            "MiClaveSuperSecretaClinica2026JWTMiClaveSuperSecreta";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generarToken(UserDetails userDetails) {

    return Jwts.builder()
            .subject(userDetails.getUsername())
            .claim(
                    "rol",
                    userDetails.getAuthorities()
                            .iterator()
                            .next()
                            .getAuthority()
            )
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(key)
            .compact();

}
    public String extraerUsername(String token) {

    Claims claims = Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();

    return claims.getSubject();
}

}