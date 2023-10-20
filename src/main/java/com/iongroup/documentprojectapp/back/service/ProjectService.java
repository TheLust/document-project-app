package com.iongroup.documentprojectapp.back.service;

import com.iongroup.documentprojectapp.back.dto.ExceptionResponse;
import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.dto.ProjectDto;
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
import java.util.stream.Stream;

public class ProjectService {

    private final RestTemplate restTemplate;
    private final String token;

    public ProjectService(RestTemplate restTemplate, String token) {
        this.restTemplate = restTemplate;
        this.token = token;
    }

    @SneakyThrows
    public List<ProjectDto> getAll() {
        try {
            return Arrays.stream(Objects.requireNonNull(restTemplate.exchange(Api.URL + "projects",
                                    HttpMethod.GET,
                                    Api.setHeader(token),
                                    ProjectDto[].class)
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
    public List<ProjectDto> getAllByInstitutionAndYear(InstitutionDto institutionDto, Integer year) {
        Stream<ProjectDto> result = getAll().stream();

        if (institutionDto != null) {
            result = result.filter(projectDto -> projectDto.getInstitution().getId().equals(institutionDto.getId()));
        }

        if (year != null) {
            result = result.filter(projectDto -> projectDto.getStartDate().getYear() == year);
        }

        return result.toList();
    }

    public List<ProjectDto> getAllByInstitution(InstitutionDto institutionDto) {
        return getAll().stream()
                .filter(projectDto -> projectDto.getInstitution().getId().equals(institutionDto.getId()))
                .toList();
    }

    @SneakyThrows
    public ProjectDto save(ProjectDto projectDto) {
        try {
            return restTemplate.exchange(Api.URL + "projects?institution=" + projectDto.getInstitution().getId(),
                            HttpMethod.POST,
                            Api.setHeader(projectDto, token),
                            ProjectDto.class)
                    .getBody();
        } catch (HttpClientErrorException e) {
            throw new BadRequestException(Objects.requireNonNull(e.getResponseBodyAs(ExceptionResponse.class)).getMessage());
        }
    }
}
