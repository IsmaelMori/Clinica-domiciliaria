package com.clinica.backend.controller;

import com.clinica.backend.dto.LoginRequest;
import com.clinica.backend.dto.LoginResponse;
import com.clinica.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {

    System.out.println("ENTRO AL LOGIN");

    return service.login(request);
}

}