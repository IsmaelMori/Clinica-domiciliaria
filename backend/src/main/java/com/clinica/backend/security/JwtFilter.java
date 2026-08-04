package com.clinica.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("\n==============================");
        System.out.println("JWT FILTER");
        System.out.println("==============================");
        System.out.println("URI: " + request.getRequestURI());

        String authHeader = request.getHeader("Authorization");

        System.out.println("Authorization:");
        System.out.println(authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("No se envió token.");
            filterChain.doFilter(request, response);
            return;
        }

        try {

            String token = authHeader.substring(7);

            String username = jwtService.extraerUsername(token);

            System.out.println("Usuario token: " + username);

            if (username != null &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                System.out.println("Usuario BD: " + userDetails.getUsername());

                System.out.println("Authorities del usuario:");
                userDetails.getAuthorities()
                        .forEach(a -> System.out.println(" - " + a.getAuthority()));

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);

                System.out.println("Autenticado correctamente.");

                System.out.println("Authorities en SecurityContext:");
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getAuthorities()
                        .forEach(a -> System.out.println(" * " + a.getAuthority()));
            }

        } catch (Exception e) {

            System.out.println("ERROR EN JWT FILTER");
            e.printStackTrace();

            SecurityContextHolder.clearContext();
        }

        System.out.println("==============================\n");

        filterChain.doFilter(request, response);
    }
}