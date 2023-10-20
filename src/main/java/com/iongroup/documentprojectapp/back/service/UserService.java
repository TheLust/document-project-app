package com.iongroup.documentprojectapp.back.service;

import com.iongroup.documentprojectapp.back.dto.PasswordChangeRequest;
import com.iongroup.documentprojectapp.back.dto.RegisterRequest;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.dto.ExceptionResponse;
import com.iongroup.documentprojectapp.back.dto.UserDto;
import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import lombok.SneakyThrows;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class UserService {

    private final RestTemplate restTemplate;
    private final String token;

    public UserService(RestTemplate restTemplate, String token) {
        this.restTemplate = restTemplate;
        this.token = token;
    }

    @SneakyThrows
    public List<UserDto> getAll() {
        try {
            return Arrays.stream(Objects.requireNonNull(restTemplate.exchange(Api.URL + "users",
                                    HttpMethod.GET,
                                    Api.setHeader(token),
                                    UserDto[].class)
                            .getBody()))
                    .toList();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        } catch (ResourceAccessException e) {
            UI.getCurrent().navigate(ErrorView.class);
            return new ArrayList<>();
        }
    }

    @SneakyThrows
    public UserDto save(RegisterRequest registerRequest) {
        try {
            return restTemplate.exchange(Api.URL + "users?institution=" + registerRequest.getInstitution().getId(),
                            HttpMethod.POST,
                            Api.setHeader(registerRequest, token),
                            UserDto.class)
                    .getBody();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }

    @SneakyThrows
    public void able(UserDto userDto) {
        try {
            restTemplate.exchange(Api.URL + "users/able" + "?id=" + userDto.getId(),
                            HttpMethod.PUT,
                            Api.setHeader(token),
                            UserDto.class);
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }

    @SneakyThrows
    public void changePassword(PasswordChangeRequest passwordChangeRequest) {
        try {
            restTemplate.exchange(Api.URL + "users/change-password" + "?id=" + passwordChangeRequest.getId(),
                            HttpMethod.PUT,
                            Api.setHeader(passwordChangeRequest, token),
                            UserDto.class);
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }
}
