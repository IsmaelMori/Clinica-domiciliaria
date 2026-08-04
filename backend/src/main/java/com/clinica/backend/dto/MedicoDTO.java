package com.clinica.backend.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicoDTO {

    private Long id;

    private String nombre;

    private String apellido;

    private String cedula;

    private String telefono;

    private String correo;

    private Long especialidadId;

    private String especialidadNombre;
}