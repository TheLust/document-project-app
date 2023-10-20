package com.iongroup.documentprojectapp.back.dto;

import com.iongroup.documentprojectapp.back.annotation.Alphanumeric;
import com.iongroup.documentprojectapp.back.util.ConstraintViolationMessage;
import com.iongroup.documentprojectapp.back.util.Field;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeRequest {

    private Long id;

    @NotBlank(message = Field.PASSWORD + ConstraintViolationMessage.NOT_BLANK)
    @Alphanumeric(message = Field.PASSWORD + ConstraintViolationMessage.ALPHANUMERIC)
    private String password;
}
