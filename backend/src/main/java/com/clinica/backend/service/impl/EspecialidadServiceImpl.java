package com.clinica.backend.service.impl;

import com.clinica.backend.entity.Especialidad;
import com.clinica.backend.exception.ResourceNotFoundException;
import com.clinica.backend.repository.EspecialidadRepository;
import com.clinica.backend.service.EspecialidadService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class EspecialidadServiceImpl implements EspecialidadService {

    private final EspecialidadRepository repository;

    public EspecialidadServiceImpl(EspecialidadRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<Especialidad> listar(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    public Especialidad buscarPorId(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Especialidad con id " + id + " no existe"));
    }

    @Override
    public Especialidad guardar(Especialidad especialidad) {

        repository.findByNombre(especialidad.getNombre())
                .ifPresent(e -> {
                    throw new RuntimeException("Ya existe una especialidad con ese nombre.");
                });

        return repository.save(especialidad);
    }

    @Override
    public Especialidad actualizar(Long id, Especialidad especialidad) {

        Especialidad existente = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Especialidad con id " + id + " no existe"));

        existente.setNombre(especialidad.getNombre());
        existente.setDescripcion(especialidad.getDescripcion());
        existente.setActivo(especialidad.getActivo());

        return repository.save(existente);
    }

    @Override
    public void eliminar(Long id) {

        Especialidad especialidad = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Especialidad con id " + id + " no existe"));

        repository.delete(especialidad);
    }
}