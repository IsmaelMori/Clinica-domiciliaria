package com.clinica.backend.service.impl;

import com.clinica.backend.entity.Paciente;
import com.clinica.backend.exception.ResourceNotFoundException;
import com.clinica.backend.repository.PacienteRepository;
import com.clinica.backend.service.PacienteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository repository;

    public PacienteServiceImpl(PacienteRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Paciente> listar(Pageable pageable) {
        return repository.findByActivoTrue(pageable);
    }

    @Override
    public Paciente buscarPorId(Long id) {

        return repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Paciente con id " + id + " no existe"));
    }

    @Override
    public List<Paciente> buscarPorNombre(String nombre) {
        return repository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre);
    }

    @Override
    public Paciente buscarPorCedula(String cedula) {

        return repository.findByCedulaAndActivoTrue(cedula)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Paciente con cédula " + cedula + " no existe"));
    }

    @Override
    public Paciente guardar(Paciente paciente) {
        return repository.save(paciente);
    }

    @Override
    public Paciente actualizar(Long id, Paciente paciente) {

        repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Paciente con id " + id + " no existe"));

        paciente.setId(id);

        return repository.save(paciente);
    }

    @Override
    public void eliminar(Long id) {

        Paciente paciente = repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Paciente con id " + id + " no existe"));

        paciente.setActivo(false);

        repository.save(paciente);
    }

}