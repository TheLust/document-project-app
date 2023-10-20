package com.iongroup.documentprojectapp.back.dto;

import com.iongroup.documentprojectapp.back.util.ConstraintViolationMessage;
import com.iongroup.documentprojectapp.back.util.Field;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = Field.USERNAME + ConstraintViolationMessage.NOT_BLANK)
    private String username;

    @NotBlank(message = Field.PASSWORD + ConstraintViolationMessage.NOT_BLANK)
    private String password;
}
