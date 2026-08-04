package com.clinica.backend.repository;

import com.clinica.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsernameAndActivoTrue(String username);

    Optional<Usuario> findByIdAndActivoTrue(Long id);

    List<Usuario> findByActivoTrue();

    boolean existsByUsername(String username);

    long countByActivoTrue();
}