package com.iongroup.documentprojectapp.back.dto;

import com.iongroup.documentprojectapp.back.util.ConstraintViolationMessage;
import com.iongroup.documentprojectapp.back.util.Field;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleDto {

    private Long id;

    @NotBlank(message = Field.NAME + ConstraintViolationMessage.NOT_BLANK)
    private String name;
}
