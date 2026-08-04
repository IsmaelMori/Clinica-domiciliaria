package com.clinica.backend.service;

import com.clinica.backend.entity.Medico;

import java.util.List;

public interface MedicoService {

    List<Medico> listar();

    Medico buscarPorId(Long id);

    Medico guardar(Medico medico);

    Medico actualizar(Long id, Medico medico);

    void eliminar(Long id);

}