package com.iongroup.documentprojectapp.back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ExceptionResponse {
    private String message;
    private long timestamp;
}
