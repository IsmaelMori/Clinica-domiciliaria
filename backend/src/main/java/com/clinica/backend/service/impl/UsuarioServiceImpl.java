package com.clinica.backend.service.impl;

import com.clinica.backend.entity.Usuario;
import com.clinica.backend.exception.ResourceNotFoundException;
import com.clinica.backend.repository.UsuarioRepository;
import com.clinica.backend.service.UsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(
            UsuarioRepository repository,
            PasswordEncoder passwordEncoder) {

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Usuario> listar() {
        return repository.findByActivoTrue();
    }

    @Override
    public Usuario buscarPorId(Long id) {

        return repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuario con id " + id + " no existe"));
    }

    @Override
    public Usuario guardar(Usuario usuario) {

        if (repository.existsByUsername(usuario.getUsername())) {
            throw new IllegalArgumentException(
                    "Ya existe un usuario con ese username.");
        }

        usuario.setPassword(
                passwordEncoder.encode(usuario.getPassword()));

        usuario.setActivo(true);

        return repository.save(usuario);
    }

    @Override
    public Usuario actualizar(Long id, Usuario usuario) {

        Usuario existente = buscarPorId(id);

        existente.setUsername(usuario.getUsername());
        existente.setRol(usuario.getRol());

        if (usuario.getPassword() != null &&
                !usuario.getPassword().isBlank()) {

            existente.setPassword(
                    passwordEncoder.encode(usuario.getPassword()));
        }

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        Usuario usuario = buscarPorId(id);

        usuario.setActivo(false);

        repository.save(usuario);
    }

}