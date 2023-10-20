package com.iongroup.documentprojectapp.back.dto;

import com.iongroup.documentprojectapp.back.annotation.Alphanumeric;
import com.iongroup.documentprojectapp.back.util.ConstraintViolationMessage;
import com.iongroup.documentprojectapp.back.util.Field;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode(exclude = {"code", "name", "additionalInformation"})
public class InstitutionDto {

    private Long id;

    @NotBlank(message = Field.CODE + ConstraintViolationMessage.NOT_BLANK)
    @Size(
            min = 1,
            max = 5,
            message = Field.CODE + ConstraintViolationMessage.SIZE

    )
    @Alphanumeric(message = Field.CODE + ConstraintViolationMessage.ALPHANUMERIC)
    private String code;

    @NotBlank(message = Field.NAME + ConstraintViolationMessage.NOT_BLANK)
    @Alphanumeric(message = Field.NAME + ConstraintViolationMessage.ALPHANUMERIC)
    private String name;

    private String additionalInformation;

    public String getDisplayName() {
        return name + " | " + code;
    }
}
