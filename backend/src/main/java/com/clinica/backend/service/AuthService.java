package com.clinica.backend.service;

import com.clinica.backend.dto.LoginRequest;
import com.clinica.backend.dto.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

}