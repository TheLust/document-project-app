package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.DocumentDto;
import com.iongroup.documentprojectapp.back.dto.DocumentTypeDto;
import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.service.DocumentService;
import com.iongroup.documentprojectapp.back.service.DocumentTypeService;
import com.iongroup.documentprojectapp.back.service.InstitutionService;
import com.iongroup.documentprojectapp.back.service.ProjectService;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.back.util.Entity;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.DPFormFactory;
import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.springframework.web.client.RestTemplate;
import org.vaadin.crudui.crud.FindAllCrudOperationListener;
import org.vaadin.crudui.crud.impl.GridCrud;

import java.util.List;

public class DocumentCrud extends VerticalLayout {

    private final DocumentService documentService;

    private final InstitutionService institutionService;

    private final ProjectService projectService;

    private final DocumentTypeService documentTypeService;

    private static GridCrud<DocumentDto> crud;

    private InstitutionDto institutionDto;
    private Integer year;
    private DocumentTypeDto documentTypeDto;

    public DocumentCrud() {
        documentService = new DocumentService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        institutionService = new InstitutionService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        projectService = new ProjectService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        documentTypeService = new DocumentTypeService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        crud = getCrud();
        Accordion accordion = getNavigation();
        accordion.close();

        Div div = new Div();
        div.add(accordion);
        div.setHeightFull();

        HorizontalLayout horizontalLayout = new HorizontalLayout();
        horizontalLayout.setWidthFull();
        horizontalLayout.add(div, crud);
        add(horizontalLayout);
        add(new Button(Entity.DOCUMENT + " " + Constants.NEW, event -> new DocumentAddForm(new DocumentDto(),
                documentService,
                institutionService,
                documentTypeService,
                projectService
                ).open())
        );
    }

    private GridCrud<DocumentDto> getCrud() {
        GridCrud<DocumentDto> crud = new GridCrud<>(DocumentDto.class, DPFormFactory.getDefaultFormFactory(DocumentDto.class));

        crud.getGrid().removeAllColumns();
        crud.getGrid().addColumn(DocumentDto::getName).setHeader(Field.NAME).setSortable(true);
        crud.getGrid().addColumn(documentDto -> documentDto.getType().getDisplayName()).setHeader(Field.TYPE).setSortable(true);
        crud.getGrid().addColumn(DocumentDto::getGroupingDate).setHeader(Field.DATE).setSortable(true);
        crud.getGrid().addColumn(documentDto -> documentDto.getInstitution().getName()).setHeader(Entity.INSTITUTION).setSortable(true);
        crud.getGrid().addColumn(documentDto -> documentDto.getProject() != null ? documentDto.getProject().getName() : "").setHeader(Entity.PROJECT).setSortable(true);
        crud.getGrid().setColumnReorderingAllowed(true);

        crud.setFindAllOperation((FindAllCrudOperationListener<DocumentDto>)() -> documentService.findAllByInstitutionAndYearAndDocumentType(institutionDto, year, documentTypeDto));

        crud.setAddOperationVisible(false);
        crud.setUpdateOperationVisible(false);
        crud.setDeleteOperationVisible(false);
        crud.setFindAllOperationVisible(false);

        return crud;
    }

    private Accordion getNavigation() {
        Accordion accordion = new Accordion();
        List<DocumentDto> documents = documentService.getAll();

        documents.stream()
                .map(DocumentDto::getInstitution)
                .distinct()
                .forEach(institution -> {
                    Span institutionName = new Span(institution.getName());
                    institutionName.addClickListener(event -> {
                        this.institutionDto = institution;
                        this.year = null;
                        this.documentTypeDto = null;
                        refresh();
                    });
                    AccordionPanel institutionPanel = new AccordionPanel(institutionName);
                    documents.stream()
                            .filter(document -> document.getInstitution().getId().equals(institution.getId()))
                            .map(document -> document.getGroupingDate().getYear())
                            .distinct()
                            .forEach(integer -> {
                                Span year = new Span(String.valueOf(integer));
                                year.addClickListener(event -> {
                                    this.institutionDto = institution;
                                    this.year = integer;
                                    this.documentTypeDto = null;
                                    refresh();
                                });
                                AccordionPanel yearPanel = new AccordionPanel(year);
                                yearPanel.addClassName("year-accordion");
                                UnorderedList types =  new UnorderedList();
                                documents.stream()
                                        .filter(document -> document.getInstitution().getId().equals(institution.getId()) && document.getGroupingDate().getYear() == integer)
                                        .map(document -> {
                                            if (document.getType().getMacro() != null) {
                                                return document.getType().getMacro();
                                            }
                                            return document.getType();
                                        })
                                        .distinct()
                                        .forEach(documentType -> {
                                            ListItem type = new ListItem(documentType.getDisplayName());
                                            type.addClickListener(event -> {
                                                this.institutionDto = institution;
                                                this.year = integer;
                                                this.documentTypeDto = documentType;
                                                refresh();
                                            });
                                            types.add(type);
                                        });
                                yearPanel.addContent(types);
                                institutionPanel.addContent(yearPanel);
                            });
                    accordion.add(institutionPanel);
                });
        return accordion;
    }

    public static void refresh() {
        crud.refreshGrid();
    }
}
