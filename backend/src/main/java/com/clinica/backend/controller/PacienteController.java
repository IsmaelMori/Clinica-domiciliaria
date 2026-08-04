package com.clinica.backend.controller;

import com.clinica.backend.dto.ApiResponse;
import com.clinica.backend.dto.PacienteDTO;
import com.clinica.backend.entity.Paciente;
import com.clinica.backend.mapper.PacienteMapper;
import com.clinica.backend.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/pacientes")
@CrossOrigin("*")
public class PacienteController {

    private final PacienteService service;
    private final PacienteMapper mapper;

    public PacienteController(PacienteService service,
                              PacienteMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<ApiResponse<Page<PacienteDTO>>> listar(Pageable pageable) {
System.out.println("*********** ENTRÓ AL CONTROLADOR ***********");
        Page<PacienteDTO> pacientes = service
                .listar(pageable)
                .map(mapper::toDTO);

        return ResponseEntity.ok(
                ApiResponse.<Page<PacienteDTO>>builder()
                        .success(true)
                        .message("Pacientes obtenidos correctamente")
                        .data(pacientes)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<ApiResponse<PacienteDTO>> buscarPorId(
            @PathVariable Long id) {

        PacienteDTO dto = mapper.toDTO(service.buscarPorId(id));

        return ResponseEntity.ok(
                ApiResponse.<PacienteDTO>builder()
                        .success(true)
                        .message("Paciente encontrado correctamente")
                        .data(dto)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/buscar/nombre")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<ApiResponse<List<PacienteDTO>>> buscarPorNombre(
            @RequestParam String nombre) {

        List<PacienteDTO> pacientes = service.buscarPorNombre(nombre)
                .stream()
                .map(mapper::toDTO)
                .toList();

        return ResponseEntity.ok(
                ApiResponse.<List<PacienteDTO>>builder()
                        .success(true)
                        .message("Búsqueda realizada correctamente")
                        .data(pacientes)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/buscar/cedula")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<ApiResponse<PacienteDTO>> buscarPorCedula(
            @RequestParam String cedula) {

        PacienteDTO dto = mapper.toDTO(service.buscarPorCedula(cedula));

        return ResponseEntity.ok(
                ApiResponse.<PacienteDTO>builder()
                        .success(true)
                        .message("Paciente encontrado correctamente")
                        .data(dto)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','RECEPCIONISTA')")
    public ResponseEntity<ApiResponse<PacienteDTO>> guardar(
            @Valid @RequestBody PacienteDTO dto) {

        Paciente paciente = mapper.toEntity(dto);

        Paciente guardado = service.guardar(paciente);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<PacienteDTO>builder()
                                .success(true)
                                .message("Paciente registrado correctamente")
                                .data(mapper.toDTO(guardado))
                                .timestamp(LocalDateTime.now())
                                .build()
                );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','RECEPCIONISTA')")
    public ResponseEntity<ApiResponse<PacienteDTO>> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody PacienteDTO dto) {

        Paciente paciente = mapper.toEntity(dto);

        Paciente actualizado = service.actualizar(id, paciente);

        return ResponseEntity.ok(
                ApiResponse.<PacienteDTO>builder()
                        .success(true)
                        .message("Paciente actualizado correctamente")
                        .data(mapper.toDTO(actualizado))
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> eliminar(@PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Paciente eliminado correctamente")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}