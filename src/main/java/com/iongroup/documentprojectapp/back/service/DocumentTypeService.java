package com.iongroup.documentprojectapp.back.service;

import com.iongroup.documentprojectapp.back.dto.DocumentTypeDto;
import com.iongroup.documentprojectapp.back.dto.ExceptionResponse;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
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

public class DocumentTypeService {

    private final RestTemplate restTemplate;
    private final String token;

    public DocumentTypeService(RestTemplate restTemplate, String token) {
        this.restTemplate = restTemplate;
        this.token = token;
    }

    @SneakyThrows
    public List<DocumentTypeDto> getAll() {
        try {
            return Arrays.stream(Objects.requireNonNull(restTemplate.exchange(Api.URL + "types",
                                    HttpMethod.GET,
                                    Api.setHeader(token),
                                    DocumentTypeDto[].class)
                            .getBody()))
                    .toList();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        } catch (ResourceAccessException e) {
            UI.getCurrent().navigate(ErrorView.class);
            return new ArrayList<>();
        }
    }

    public List<DocumentTypeDto> getMacros() {
        return getAll().stream()
                .filter(documentTypeDto -> documentTypeDto.getMacro() == null)
                .toList();
    }

    public List<DocumentTypeDto> getMicrosForMacro(DocumentTypeDto documentTypeDto) {
        return getAll().stream()
                .filter(micro -> micro.getMacro() != null)
                .filter(micro -> micro.getMacro().getId().equals(documentTypeDto.getId()))
                .toList();
    }
}
