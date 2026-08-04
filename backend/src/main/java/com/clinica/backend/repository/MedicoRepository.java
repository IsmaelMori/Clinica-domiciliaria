package com.clinica.backend.repository;

import com.clinica.backend.entity.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {

    List<Medico> findByActivoTrue();

    Optional<Medico> findByIdAndActivoTrue(Long id);

    long countByActivoTrue();
}