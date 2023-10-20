package com.iongroup.documentprojectapp.back.dto;

import com.iongroup.documentprojectapp.back.annotation.Alphanumeric;
import com.iongroup.documentprojectapp.back.util.ConstraintViolationMessage;
import com.iongroup.documentprojectapp.back.util.Field;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@EqualsAndHashCode(exclude = {"institution", "user", "name", "startDate", "finishDate", "additionalInformation", "isActive"})
@ToString
public class ProjectDto {

    private Long id;

    private InstitutionDto institution;

    private UserDto user;

    @NotBlank(message = Field.NAME + ConstraintViolationMessage.NOT_BLANK)
    @Alphanumeric(message = Field.NAME + ConstraintViolationMessage.ALPHANUMERIC)
    private String name;

    @NotNull(message = Field.START_DATE + ConstraintViolationMessage.NOT_NULL)
    private LocalDate startDate;

    @NotNull(message = Field.FINISH_DATE + ConstraintViolationMessage.NOT_NULL)
    private LocalDate finishDate;

    @NotBlank(message = Field.ADDITIONAL_INFORMATION + ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 10,
            max = 1000,
            message = Field.ADDITIONAL_INFORMATION + ConstraintViolationMessage.SIZE
    )
    @Alphanumeric(message = Field.ADDITIONAL_INFORMATION + ConstraintViolationMessage.ALPHANUMERIC)
    private String additionalInformation;

    @NotNull(message = Field.ACTIVE + ConstraintViolationMessage.NOT_NULL)
    private Boolean isActive;
}
