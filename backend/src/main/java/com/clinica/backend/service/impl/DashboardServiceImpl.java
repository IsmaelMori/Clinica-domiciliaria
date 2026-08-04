package com.clinica.backend.service.impl;

import com.clinica.backend.dto.DashboardResponse;
import com.clinica.backend.repository.CitaRepository;
import com.clinica.backend.repository.EspecialidadRepository;
import com.clinica.backend.repository.MedicoRepository;
import com.clinica.backend.repository.PacienteRepository;
import com.clinica.backend.repository.UsuarioRepository;
import com.clinica.backend.service.DashboardService;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final UsuarioRepository usuarioRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;
    private final EspecialidadRepository especialidadRepository;
    private final CitaRepository citaRepository;

    public DashboardServiceImpl(
            UsuarioRepository usuarioRepository,
            PacienteRepository pacienteRepository,
            MedicoRepository medicoRepository,
            EspecialidadRepository especialidadRepository,
            CitaRepository citaRepository) {

        this.usuarioRepository = usuarioRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
        this.especialidadRepository = especialidadRepository;
        this.citaRepository = citaRepository;
    }

    @Override
    public DashboardResponse obtenerResumen() {

        return DashboardResponse.builder()
                .usuarios(usuarioRepository.countByActivoTrue())
                .pacientes(pacienteRepository.countByActivoTrue())
                .medicos(medicoRepository.countByActivoTrue())
                .especialidades(especialidadRepository.countByActivoTrue())
                .citas(citaRepository.countByActivoTrue())
                .build();
    }

}