package com.clinica.backend.mapper;

import com.clinica.backend.dto.PacienteDTO;
import com.clinica.backend.entity.Paciente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PacienteMapper {

    PacienteDTO toDTO(Paciente paciente);

    @Mapping(target = "activo", ignore = true)
    Paciente toEntity(PacienteDTO dto);

    List<PacienteDTO> toDTOList(List<Paciente> list);

}