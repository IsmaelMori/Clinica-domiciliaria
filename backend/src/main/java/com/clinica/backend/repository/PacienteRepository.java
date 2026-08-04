package com.clinica.backend.repository;

import com.clinica.backend.entity.Paciente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Page<Paciente> findByActivoTrue(Pageable pageable);

    Optional<Paciente> findByIdAndActivoTrue(Long id);

    List<Paciente> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);

    Optional<Paciente> findByCedulaAndActivoTrue(String cedula);

    long countByActivoTrue();
}