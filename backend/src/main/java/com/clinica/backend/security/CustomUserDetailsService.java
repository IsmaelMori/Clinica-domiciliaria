package com.clinica.backend.security;

import com.clinica.backend.entity.Usuario;
import com.clinica.backend.repository.UsuarioRepository;

import org.springframework.security.core.userdetails.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {


    private final UsuarioRepository repository;


    public CustomUserDetailsService(
            UsuarioRepository repository
    ){
        this.repository = repository;
    }



    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {


        Usuario usuario = repository
                .findByUsernameAndActivoTrue(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Usuario no encontrado"
                        ));


        String rol = usuario.getRol();


        if(!rol.startsWith("ROLE_")){
            rol = "ROLE_" + rol;
        }



        System.out.println("==========================");
        System.out.println("USUARIO: " + usuario.getUsername());
        System.out.println("ROL BD: " + usuario.getRol());
        System.out.println("ROL SPRING: " + rol);
        System.out.println("==========================");



        return new User(

                usuario.getUsername(),

                usuario.getPassword(),

                List.of(
                        new SimpleGrantedAuthority(rol)
                )

        );

    }

}