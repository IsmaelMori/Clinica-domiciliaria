package com.clinica.backend.service;

import com.clinica.backend.entity.Usuario;

import java.util.List;

public interface UsuarioService {

    List<Usuario> listar();

    Usuario buscarPorId(Long id);

    Usuario guardar(Usuario usuario);

    Usuario actualizar(Long id, Usuario usuario);

    void eliminar(Long id);

}