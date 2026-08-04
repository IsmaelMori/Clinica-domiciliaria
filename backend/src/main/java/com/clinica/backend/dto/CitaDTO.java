package com.clinica.backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CitaDTO {

    private Long id;

    private LocalDate fecha;

    private LocalTime hora;

    private String observaciones;

    private Long pacienteId;
    private String pacienteNombre;

    private Long medicoId;
    private String medicoNombre;
}