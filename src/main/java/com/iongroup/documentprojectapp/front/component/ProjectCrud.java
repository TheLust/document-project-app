package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.dto.ProjectDto;
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
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import org.springframework.web.client.RestTemplate;
import org.vaadin.crudui.crud.FindAllCrudOperationListener;
import org.vaadin.crudui.crud.impl.GridCrud;

import java.util.Comparator;
import java.util.List;

@CssImport("./themes/component-styles/project-crud.css")
public class ProjectCrud extends VerticalLayout {

    private final ProjectService projectService;

    private final InstitutionService institutionService;

    private static GridCrud<ProjectDto> crud;

    private InstitutionDto institutionDto;

    private Integer year;

    public ProjectCrud() {
        projectService = new ProjectService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        institutionService = new InstitutionService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
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
        add(new Button(Entity.PROJECT + " " + Constants.NEW, event -> new ProjectAddForm(new ProjectDto(), projectService, institutionService).open()));
    }

    private GridCrud<ProjectDto> getCrud() {
        GridCrud<ProjectDto> crud = new GridCrud<>(ProjectDto.class, DPFormFactory.getDefaultFormFactory(ProjectDto.class));

        crud.getGrid().removeAllColumns();
        crud.getGrid().addColumn(ProjectDto::getName).setHeader(Field.NAME).setSortable(true);
        crud.getGrid().addColumn(ProjectDto::getStartDate).setHeader(Field.START_DATE).setSortable(true);
        crud.getGrid().addColumn(ProjectDto::getFinishDate).setHeader(Field.FINISH_DATE).setSortable(true);
        crud.getGrid().addColumn(projectDto -> projectDto.getInstitution().getName()).setHeader(Entity.INSTITUTION).setSortable(true);
        crud.getGrid().addColumn(projectDto -> projectDto.getUser().getUsername()).setHeader(Entity.USER).setSortable(true);
        crud.getGrid().addColumn(ProjectDto::getIsActive)
                .setHeader(Field.ACTIVE)
                .setSortable(true)
                .setComparator(Comparator.comparing(ProjectDto::getIsActive))
                .setRenderer(new ComponentRenderer<>(projectDto -> {
                    Checkbox checkbox = new Checkbox();
                    checkbox.setValue(projectDto.getIsActive());
                    checkbox.setEnabled(false);
                    return checkbox;
                }));
        crud.getGrid().setColumnReorderingAllowed(true);

        crud.setFindAllOperation((FindAllCrudOperationListener<ProjectDto>) () -> projectService.getAllByInstitutionAndYear(institutionDto, year));

        crud.setAddOperationVisible(false);
        crud.setUpdateOperationVisible(false);
        crud.setDeleteOperationVisible(false);
        crud.setFindAllOperationVisible(false);

        return crud;
    }

    private Accordion getNavigation() {
        Accordion accordion = new Accordion();
        List<ProjectDto> projects = projectService.getAll();

        projects.stream()
                .map(ProjectDto::getInstitution)
                .distinct()
                .forEach(institution -> {
                    UnorderedList years =  new UnorderedList();
                    projects.stream()
                            .filter(project -> project.getInstitution().getId().equals(institution.getId()))
                            .map(projectDto -> projectDto.getStartDate().getYear())
                            .distinct()
                            .forEach(integer -> {
                                ListItem year = new ListItem(String.valueOf(integer));
                                year.addClickListener(listItemClickEvent -> {
                                    institutionDto = institution;
                                    this.year = integer;
                                    refresh();
                                });
                                years.add(year);
                            });
                    Span title = new Span(institution.getName());
                    title.addClickListener(spanClickEvent -> {
                        institutionDto = institution;
                        year = null;
                        refresh();
                    });
                    AccordionPanel institutionPanel = new AccordionPanel(title, years);
                    accordion.add(institutionPanel);
                });
        return accordion;
    }

    public static void refresh() {
        crud.refreshGrid();
    }
}
