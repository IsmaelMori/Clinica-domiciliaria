package com.clinica.backend.mapper;

import com.clinica.backend.dto.CitaDTO;
import com.clinica.backend.entity.Cita;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CitaMapper {

    @Mapping(source = "paciente.id", target = "pacienteId")
    @Mapping(source = "paciente.nombre", target = "pacienteNombre")
    @Mapping(source = "medico.id", target = "medicoId")
    @Mapping(source = "medico.nombre", target = "medicoNombre")
    CitaDTO toDTO(Cita cita);

    List<CitaDTO> toDTOList(List<Cita> lista);
}