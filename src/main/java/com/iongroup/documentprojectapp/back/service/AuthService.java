package com.iongroup.documentprojectapp.back.service;

import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.dto.ExceptionResponse;
import com.iongroup.documentprojectapp.back.dto.LoginRequest;
import com.iongroup.documentprojectapp.back.util.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
public class AuthService {

    private final RestTemplate restTemplate;

    public String login(LoginRequest loginRequest) {
        try {
            return restTemplate.exchange(
                            Api.AUTH + "login",
                            HttpMethod.POST,
                            Api.setHeader(loginRequest),
                            String.class)
                    .getBody();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }

    public List<String> getRolesFromToken(String token) {
        try {
            return Arrays.stream(Objects.requireNonNull(restTemplate.exchange(
                            Api.AUTH + "token/roles?token=" + token,
                            HttpMethod.GET,
                            Api.setHeader(),
                            String[].class)
                    .getBody())).toList();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }

}
