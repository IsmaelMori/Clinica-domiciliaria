package com.clinica.backend.service.impl;

import com.clinica.backend.dto.LoginRequest;
import com.clinica.backend.dto.LoginResponse;
import com.clinica.backend.security.JwtService;
import com.clinica.backend.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
                           JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        try {

            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );

            UserDetails user = (UserDetails) authentication.getPrincipal();

            String token = jwtService.generarToken(user);

            return new LoginResponse(
                    token,
                    "Bearer",
                    user.getUsername(),
                    user.getAuthorities().iterator().next().getAuthority()
            );

        } catch (Exception e) {

            e.printStackTrace();

            throw e;
        }
    }
}