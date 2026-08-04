package com.clinica.backend.controller;

import com.clinica.backend.dto.CitaDTO;
import com.clinica.backend.entity.Cita;
import com.clinica.backend.mapper.CitaMapper;
import com.clinica.backend.service.CitaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/citas")
@CrossOrigin("*")
public class CitaController {

    private final CitaService service;
    private final CitaMapper mapper;

    public CitaController(CitaService service,
                          CitaMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<List<CitaDTO>> listar() {

        return ResponseEntity.ok(
                mapper.toDTOList(service.listar())
        );
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<CitaDTO> buscar(@PathVariable Long id) {

        return ResponseEntity.ok(
                mapper.toDTO(service.buscarPorId(id))
        );
    }

    @GetMapping("/buscar/fecha")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<List<CitaDTO>> buscarPorFecha(
            @RequestParam LocalDate fecha) {

        List<CitaDTO> citas = service.buscarPorFecha(fecha)
                .stream()
                .map(mapper::toDTO)
                .toList();

        return ResponseEntity.ok(citas);
    }

    @GetMapping("/buscar/medico")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<List<CitaDTO>> buscarPorMedico(
            @RequestParam Long medicoId) {

        List<CitaDTO> citas = service.buscarPorMedico(medicoId)
                .stream()
                .map(mapper::toDTO)
                .toList();

        return ResponseEntity.ok(citas);
    }

    @GetMapping("/buscar/paciente")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<List<CitaDTO>> buscarPorPaciente(
            @RequestParam Long pacienteId) {

        List<CitaDTO> citas = service.buscarPorPaciente(pacienteId)
                .stream()
                .map(mapper::toDTO)
                .toList();

        return ResponseEntity.ok(citas);
    }

    @GetMapping("/buscar/agenda")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
    public ResponseEntity<List<CitaDTO>> buscarPorMedicoYFecha(
            @RequestParam Long medicoId,
            @RequestParam LocalDate fecha) {

        List<CitaDTO> citas = service.buscarPorMedicoYFecha(medicoId, fecha)
                .stream()
                .map(mapper::toDTO)
                .toList();

        return ResponseEntity.ok(citas);
    }

    @PostMapping
@PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
public ResponseEntity<CitaDTO> guardar(@RequestBody Cita cita) {

    System.out.println("==================================");
    System.out.println("ENTRÓ AL POST DE CITAS");
    System.out.println(cita);
    System.out.println("==================================");

    Cita guardada = service.guardar(cita);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(mapper.toDTO(guardada));
}

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO','RECEPCIONISTA')")
   public ResponseEntity<CitaDTO> actualizar(
        @PathVariable Long id,
        @Valid @RequestBody Cita cita) {

        Cita actualizada = service.actualizar(id, cita);

        return ResponseEntity.ok(
                mapper.toDTO(actualizada)
        );
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }

}