package com.iongroup.documentprojectapp.back.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;

@Target( { FIELD, PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = AlphanumericValidator.class)
public @interface Alphanumeric {

    String message() default "Field must be alphanumeric";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
