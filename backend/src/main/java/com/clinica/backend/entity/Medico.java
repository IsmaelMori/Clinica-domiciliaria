package com.clinica.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(callSuper = true)
@Table(name = "medico")
@Entity
public class Medico extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotBlank(message = "El nombre es obligatorio")
    @Column(nullable = false)
    private String nombre;


    @NotBlank(message = "El apellido es obligatorio")
    @Column(nullable = false)
    private String apellido;


    @NotBlank(message = "La cédula es obligatoria")
    @Size(min = 10, max = 10, message = "La cédula debe tener 10 dígitos")
    @Pattern(regexp = "\\d+", message = "La cédula solo debe contener números")
    @Column(nullable = false, unique = true, length = 10)
    private String cedula;


    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(regexp = "\\d+", message = "El teléfono solo debe contener números")
    @Column(nullable = false)
    private String telefono;


    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Debe ingresar un correo válido")
    @Column(nullable = false, unique = true)
    private String correo;


    @ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(
    name = "especialidad_id",
    referencedColumnName = "id",
    nullable = false
)
private Especialidad especialidad;


    @Builder.Default
    @Column(nullable = false)
    private Boolean activo = true;

}