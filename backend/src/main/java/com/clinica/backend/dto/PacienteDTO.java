package com.clinica.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PacienteDTO {

    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El apellido es obligatorio")
    private String apellido;

    @NotBlank(message = "La cédula es obligatoria")
    @Size(min = 10, max = 10, message = "La cédula debe tener 10 dígitos")
    @Pattern(regexp = "\\d+", message = "La cédula solo debe contener números")
    private String cedula;

    @NotBlank(message = "El teléfono es obligatorio")
@Pattern(regexp = "\\d{10}", message = "El teléfono debe tener 10 dígitos")
private String telefono;

    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;
}