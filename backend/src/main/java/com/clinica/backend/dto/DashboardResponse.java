package com.clinica.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardResponse {

    private long usuarios;
    private long pacientes;
    private long medicos;
    private long especialidades;
    private long citas;

}