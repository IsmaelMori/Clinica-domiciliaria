package com.clinica.backend.service;

import com.clinica.backend.entity.Especialidad;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EspecialidadService {

    Page<Especialidad> listar(Pageable pageable);

    Especialidad buscarPorId(Long id);

    Especialidad guardar(Especialidad especialidad);

    Especialidad actualizar(Long id, Especialidad especialidad);

    void eliminar(Long id);

}