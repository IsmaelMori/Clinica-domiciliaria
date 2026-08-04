package com.clinica.backend.mapper;

import com.clinica.backend.dto.EspecialidadDTO;
import com.clinica.backend.entity.Especialidad;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface EspecialidadMapper {

    EspecialidadDTO toDTO(Especialidad entity);

    Especialidad toEntity(EspecialidadDTO dto);

    List<EspecialidadDTO> toDTOList(List<Especialidad> list);

}