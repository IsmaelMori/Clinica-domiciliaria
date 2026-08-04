package com.clinica.backend.config;

import com.clinica.backend.entity.Usuario;
import com.clinica.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsuarios(
            UsuarioRepository repository,
            PasswordEncoder encoder) {

        return args -> {

            if (repository.findByUsernameAndActivoTrue("admin").isEmpty()) {

                Usuario admin = Usuario.builder()
                        .username("admin")
                        .password(encoder.encode("123456"))
                        .rol("ADMIN")
                        .activo(true)
                        .build();

                repository.save(admin);

                System.out.println("Administrador creado correctamente.");
            }

        };
    }

}