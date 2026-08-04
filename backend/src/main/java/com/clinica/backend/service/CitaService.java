package com.clinica.backend.service;

import com.clinica.backend.entity.Cita;

import java.time.LocalDate;
import java.util.List;

public interface CitaService {

    // Listar todas las citas
    List<Cita> listar();

    // Buscar por ID
    Cita buscarPorId(Long id);

    // Buscar por fecha
    List<Cita> buscarPorFecha(LocalDate fecha);

    // Buscar por médico
    List<Cita> buscarPorMedico(Long medicoId);

    // Buscar por paciente
    List<Cita> buscarPorPaciente(Long pacienteId);

    // Buscar por médico y fecha
    List<Cita> buscarPorMedicoYFecha(Long medicoId, LocalDate fecha);

    // Guardar
    Cita guardar(Cita cita);

    // Actualizar
    Cita actualizar(Long id, Cita cita);

    // Eliminar
    void eliminar(Long id);

}