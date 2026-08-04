package com.clinica.backend.service.impl;

import com.clinica.backend.entity.Medico;
import com.clinica.backend.exception.ResourceNotFoundException;
import com.clinica.backend.repository.MedicoRepository;
import com.clinica.backend.service.MedicoService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoServiceImpl implements MedicoService {

    private final MedicoRepository repository;

    public MedicoServiceImpl(MedicoRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Medico> listar() {
        return repository.findByActivoTrue();
    }

    @Override
    public Medico buscarPorId(Long id) {

        return repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Médico con id " + id + " no existe"));
    }

    @Override
    public Medico guardar(Medico medico) {

        medico.setActivo(true);

        return repository.save(medico);
    }

    @Override
    public Medico actualizar(Long id, Medico medico) {

        Medico existente = repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Médico con id " + id + " no existe"));

        medico.setId(existente.getId());
        medico.setCreatedAt(existente.getCreatedAt());
        medico.setActivo(existente.getActivo());

        return repository.save(medico);
    }

    @Override
    public void eliminar(Long id) {

        Medico medico = repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Médico con id " + id + " no existe"));

        medico.setActivo(false);

        repository.save(medico);
    }

}