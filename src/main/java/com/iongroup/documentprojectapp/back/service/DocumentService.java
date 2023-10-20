package com.iongroup.documentprojectapp.back.service;

import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.iongroup.documentprojectapp.back.dto.DocumentDto;
import com.iongroup.documentprojectapp.back.dto.DocumentTypeDto;
import com.iongroup.documentprojectapp.back.dto.ExceptionResponse;
import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import lombok.SneakyThrows;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

public class DocumentService {

    private final RestTemplate restTemplate;
    private final String token;

    public DocumentService(RestTemplate restTemplate, String token) {
        this.restTemplate = restTemplate;
        this.token = token;
    }

    @SneakyThrows
    public List<DocumentDto> getAll() {
        try {
            return Arrays.stream(Objects.requireNonNull(restTemplate.exchange(Api.URL + "documents",
                                    HttpMethod.GET,
                                    Api.setHeader(token),
                                    DocumentDto[].class)
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
    public List<DocumentDto> findAllForBankOperator() {
        try {
            return Arrays.stream(Objects.requireNonNull(restTemplate.exchange(Api.URL + "documents/my-institution",
                                    HttpMethod.GET,
                                    Api.setHeader(token),
                                    DocumentDto[].class)
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
    public Resource download(DocumentDto documentDto) {
        try {
            return Objects.requireNonNull(restTemplate.exchange(Api.URL + "documents/download?id=" + documentDto.getId(),
                                    HttpMethod.GET,
                                    Api.setHeader(token),
                                    Resource.class)
                            .getBody());
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        } catch (ResourceAccessException e) {
            UI.getCurrent().navigate(ErrorView.class);
            return null;
        }
    }

    @SneakyThrows
    public List<DocumentDto> findAllByInstitutionAndYearAndDocumentType(InstitutionDto institutionDto,
                                                                        Integer year,
                                                                        DocumentTypeDto documentTypeDto) {
        Stream<DocumentDto> result = getAll().stream();

        if (institutionDto != null) {
            result = result.filter(documentDto -> documentDto.getInstitution().getId().equals(institutionDto.getId()));
        }

        if (year != null) {
            result = result.filter(documentDto -> documentDto.getGroupingDate().getYear() == year);
        }

        if (documentTypeDto != null) {
            result = result.filter(documentDto -> {
                if (documentDto.getType().getMacro() != null) {
                    return documentDto.getType().getMacro().getId().equals(documentTypeDto.getId());
                } else {
                    return documentDto.getType().getId().equals(documentTypeDto.getId());
                }
            });
        }

        return result.toList();
    }

    @SneakyThrows
    public DocumentDto save(DocumentDto documentDto, InputStream inputStream) {
        try {
            String url = Api.URL + "documents?institution=" + documentDto.getInstitution().getId() +
                    "&type=" + documentDto.getType().getId();
            if (documentDto.getType().getMacro() != null) {
                if (documentDto.getType().getMacro().getName().equals("Progettazione")) {
                    url += "&project=" + documentDto.getProject().getId();
                }
            }

            documentDto.setProject(null);

            ObjectWriter ow = JsonMapper.builder().addModule(new JavaTimeModule()).build().writer();

            File file = new File(documentDto.getName());
            FileUtils.copyInputStreamToFile(inputStream, file);

            MultipartBodyBuilder multipartBodyBuilder = new MultipartBodyBuilder();
            multipartBodyBuilder.part("file", new FileSystemResource(file));
            multipartBodyBuilder.part("document", ow.writeValueAsString(documentDto), MediaType.APPLICATION_JSON);

            MultiValueMap<String, HttpEntity<?>> multipartBody = multipartBodyBuilder.build();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);
            headers.set("Authorization", "Bearer " + token);


            HttpEntity<MultiValueMap<String, HttpEntity<?>>> httpEntity = new HttpEntity<>(multipartBody, headers);

            return restTemplate.exchange(url,
                            HttpMethod.POST,
                            httpEntity,
                            DocumentDto.class)
                    .getBody();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }
}
