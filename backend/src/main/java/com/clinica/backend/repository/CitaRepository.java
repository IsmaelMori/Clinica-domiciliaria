package com.clinica.backend.repository;

import com.clinica.backend.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Long> {

    List<Cita> findByActivoTrue();

    Optional<Cita> findByIdAndActivoTrue(Long id);

    List<Cita> findByFechaAndActivoTrue(LocalDate fecha);

    List<Cita> findByMedicoIdAndActivoTrue(Long medicoId);

    List<Cita> findByPacienteIdAndActivoTrue(Long pacienteId);

    List<Cita> findByMedicoIdAndFechaAndActivoTrue(Long medicoId, LocalDate fecha);

    boolean existsByMedicoIdAndFechaAndHoraAndActivoTrue(
            Long medicoId,
            LocalDate fecha,
            LocalTime hora
    );

    boolean existsByPacienteIdAndFechaAndHoraAndActivoTrue(
            Long pacienteId,
            LocalDate fecha,
            LocalTime hora
    );

    boolean existsByMedicoIdAndActivoTrue(Long medicoId);

    boolean existsByPacienteIdAndActivoTrue(Long pacienteId);

    long countByActivoTrue();
}