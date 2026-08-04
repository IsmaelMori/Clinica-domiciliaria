package com.clinica.backend.mapper;

import com.clinica.backend.dto.MedicoDTO;
import com.clinica.backend.entity.Medico;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MedicoMapper {

    @Mapping(source = "especialidad.id", target = "especialidadId")
    @Mapping(source = "especialidad.nombre", target = "especialidadNombre")
    MedicoDTO toDTO(Medico medico);

    List<MedicoDTO> toDTOList(List<Medico> lista);
}