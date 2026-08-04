package com.clinica.backend.controller;

import com.clinica.backend.dto.ApiResponse;
import com.clinica.backend.dto.EspecialidadDTO;
import com.clinica.backend.entity.Especialidad;
import com.clinica.backend.mapper.EspecialidadMapper;
import com.clinica.backend.service.EspecialidadService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/especialidades")
@CrossOrigin("*")
public class EspecialidadController {

    private final EspecialidadService service;
    private final EspecialidadMapper mapper;

    public EspecialidadController(
            EspecialidadService service,
            EspecialidadMapper mapper
    ) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','RECEPCIONISTA','MEDICO')")
    public ResponseEntity<ApiResponse<Page<EspecialidadDTO>>> listar(Pageable pageable) {

        Page<EspecialidadDTO> datos = service
                .listar(pageable)
                .map(mapper::toDTO);

        return ResponseEntity.ok(
                ApiResponse.<Page<EspecialidadDTO>>builder()
                        .success(true)
                        .message("Especialidades obtenidas correctamente")
                        .data(datos)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','RECEPCIONISTA','MEDICO')")
    public ResponseEntity<ApiResponse<EspecialidadDTO>> buscarPorId(
            @PathVariable Long id) {

        EspecialidadDTO dto = mapper.toDTO(service.buscarPorId(id));

        return ResponseEntity.ok(
                ApiResponse.<EspecialidadDTO>builder()
                        .success(true)
                        .message("Especialidad encontrada")
                        .data(dto)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EspecialidadDTO>> guardar(
            @Valid @RequestBody EspecialidadDTO dto) {

        Especialidad entidad = mapper.toEntity(dto);

        Especialidad guardada = service.guardar(entidad);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<EspecialidadDTO>builder()
                                .success(true)
                                .message("Especialidad registrada correctamente")
                                .data(mapper.toDTO(guardada))
                                .timestamp(LocalDateTime.now())
                                .build()
                );
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<EspecialidadDTO>> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody EspecialidadDTO dto) {

        Especialidad entidad = mapper.toEntity(dto);

        Especialidad actualizada = service.actualizar(id, entidad);

        return ResponseEntity.ok(
                ApiResponse.<EspecialidadDTO>builder()
                        .success(true)
                        .message("Especialidad actualizada correctamente")
                        .data(mapper.toDTO(actualizada))
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Especialidad eliminada correctamente")
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
}