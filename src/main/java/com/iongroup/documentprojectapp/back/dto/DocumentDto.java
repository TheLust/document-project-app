package com.iongroup.documentprojectapp.back.dto;

import com.iongroup.documentprojectapp.back.annotation.Alphanumeric;
import com.iongroup.documentprojectapp.back.util.ConstraintViolationMessage;
import com.iongroup.documentprojectapp.back.util.Entity;
import com.iongroup.documentprojectapp.back.util.Field;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class DocumentDto {

    private Long id;

    @NotNull(message = Entity.INSTITUTION + ConstraintViolationMessage.NOT_NULL)
    private InstitutionDto institution;

    private UserDto user;

    @NotNull(message = Field.MACRO + ConstraintViolationMessage.NOT_NULL)
    private DocumentTypeDto macro;

    private DocumentTypeDto type;

    private ProjectDto project;

    private String name;

    private String path;

    private LocalDate uploadDate;

    @NotBlank(message = Field.ADDITIONAL_INFORMATION + ConstraintViolationMessage.NOT_BLANK)
    @Alphanumeric(message = Field.ADDITIONAL_INFORMATION + ConstraintViolationMessage.ALPHANUMERIC)
    private String additionalInformation;

    @NotNull(message = Field.GROUPING_DATE + ConstraintViolationMessage.NOT_NULL)
    private LocalDate groupingDate;
}
