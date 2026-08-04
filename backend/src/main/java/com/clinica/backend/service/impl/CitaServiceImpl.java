package com.clinica.backend.service.impl;

import com.clinica.backend.entity.Cita;
import com.clinica.backend.exception.ResourceNotFoundException;
import com.clinica.backend.repository.CitaRepository;
import com.clinica.backend.service.CitaService;
import com.clinica.backend.service.MedicoService;
import com.clinica.backend.service.PacienteService;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class CitaServiceImpl implements CitaService {

    private final CitaRepository repository;
    private final MedicoService medicoService;
    private final PacienteService pacienteService;

    public CitaServiceImpl(
            CitaRepository repository,
            MedicoService medicoService,
            PacienteService pacienteService) {

        this.repository = repository;
        this.medicoService = medicoService;
        this.pacienteService = pacienteService;
    }

    @Override
    public List<Cita> listar() {
        return repository.findByActivoTrue();
    }

    @Override
    public Cita buscarPorId(Long id) {

        return repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cita con id " + id + " no existe"));
    }

    @Override
    public List<Cita> buscarPorFecha(LocalDate fecha) {
        return repository.findByFechaAndActivoTrue(fecha);
    }

    @Override
    public List<Cita> buscarPorMedico(Long medicoId) {
        return repository.findByMedicoIdAndActivoTrue(medicoId);
    }

    @Override
    public List<Cita> buscarPorPaciente(Long pacienteId) {
        return repository.findByPacienteIdAndActivoTrue(pacienteId);
    }

    @Override
    public List<Cita> buscarPorMedicoYFecha(Long medicoId, LocalDate fecha) {
        return repository.findByMedicoIdAndFechaAndActivoTrue(medicoId, fecha);
    }

    @Override
    public Cita guardar(Cita cita) {

        medicoService.buscarPorId(cita.getMedico().getId());
        pacienteService.buscarPorId(cita.getPaciente().getId());

        if (cita.getFecha().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "No se pueden registrar citas en fechas pasadas.");
        }

        if (cita.getFecha().getDayOfWeek() == DayOfWeek.SUNDAY) {
            throw new IllegalArgumentException(
                    "No se pueden registrar citas los domingos.");
        }

        if (cita.getHora().isBefore(LocalTime.of(8, 0)) ||
                cita.getHora().isAfter(LocalTime.of(18, 0))) {

            throw new IllegalArgumentException(
                    "Las citas solo pueden registrarse entre las 08:00 y las 18:00.");
        }

        if (repository.existsByMedicoIdAndFechaAndHoraAndActivoTrue(
                cita.getMedico().getId(),
                cita.getFecha(),
                cita.getHora())) {

            throw new IllegalArgumentException(
                    "El médico ya tiene una cita registrada en esa fecha y hora.");
        }

        if (repository.existsByPacienteIdAndFechaAndHoraAndActivoTrue(
                cita.getPaciente().getId(),
                cita.getFecha(),
                cita.getHora())) {

            throw new IllegalArgumentException(
                    "El paciente ya tiene una cita registrada en esa fecha y hora.");
        }

        return repository.save(cita);
    }

    @Override
    public Cita actualizar(Long id, Cita cita) {

        Cita existente = buscarPorId(id);

        medicoService.buscarPorId(cita.getMedico().getId());
        pacienteService.buscarPorId(cita.getPaciente().getId());

        if (cita.getFecha().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "No se pueden registrar citas en fechas pasadas.");
        }

        if (cita.getFecha().getDayOfWeek() == DayOfWeek.SUNDAY) {
            throw new IllegalArgumentException(
                    "No se pueden registrar citas los domingos.");
        }

        if (cita.getHora().isBefore(LocalTime.of(8, 0)) ||
                cita.getHora().isAfter(LocalTime.of(18, 0))) {

            throw new IllegalArgumentException(
                    "Las citas solo pueden registrarse entre las 08:00 y las 18:00.");
        }

        cita.setId(existente.getId());
        cita.setCreatedAt(existente.getCreatedAt());

        return repository.save(cita);
    }

    @Override
    public void eliminar(Long id) {

        Cita cita = repository.findByIdAndActivoTrue(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cita con id " + id + " no existe"));

        cita.setActivo(false);

        repository.save(cita);
    }
}