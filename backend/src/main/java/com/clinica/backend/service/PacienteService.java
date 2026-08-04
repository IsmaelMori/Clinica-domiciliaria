package com.clinica.backend.service;

import com.clinica.backend.entity.Paciente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PacienteService {

    Page<Paciente> listar(Pageable pageable);

    Paciente buscarPorId(Long id);

    List<Paciente> buscarPorNombre(String nombre);

    Paciente buscarPorCedula(String cedula);

    Paciente guardar(Paciente paciente);

    Paciente actualizar(Long id, Paciente paciente);

    void eliminar(Long id);

}