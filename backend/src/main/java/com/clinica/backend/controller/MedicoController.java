package com.clinica.backend.controller;

import com.clinica.backend.dto.MedicoDTO;
import com.clinica.backend.entity.Medico;
import com.clinica.backend.mapper.MedicoMapper;
import com.clinica.backend.service.MedicoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
@CrossOrigin("*")
public class MedicoController {

    private final MedicoService service;
    private final MedicoMapper mapper;

    public MedicoController(MedicoService service,
                            MedicoMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<List<MedicoDTO>> listar() {

        return ResponseEntity.ok(mapper.toDTOList(service.listar()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MEDICO')")
    public ResponseEntity<MedicoDTO> buscar(@PathVariable Long id) {

        return ResponseEntity.ok(mapper.toDTO(service.buscarPorId(id)));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Medico> guardar(@RequestBody Medico medico) {

        Medico guardado = service.guardar(medico);

        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Medico> actualizar(
            @PathVariable Long id,
            @RequestBody Medico medico) {

        return ResponseEntity.ok(service.actualizar(id, medico));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }

}