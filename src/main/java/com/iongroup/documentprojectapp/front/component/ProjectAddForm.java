package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.dto.ProjectDto;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.service.InstitutionService;
import com.iongroup.documentprojectapp.back.service.ProjectService;
import com.iongroup.documentprojectapp.back.util.Entity;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.ErrorMessage;
import com.iongroup.documentprojectapp.front.util.ErrorUtils;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.value.ValueChangeMode;

public class ProjectAddForm extends Dialog {

    private final ProjectService projectService;

    protected final TextField name = new TextField(Field.NAME);
    protected final ComboBox<InstitutionDto> institution;
    protected final DatePicker startDate = new DatePicker(Field.START_DATE);
    protected final DatePicker finishDate = new DatePicker(Field.FINISH_DATE);
    protected final TextArea additionalInformation = new TextArea(Field.ADDITIONAL_INFORMATION);
    protected final Checkbox isActive = new Checkbox(Field.ACTIVE);
    private final BeanValidationBinder<ProjectDto> binder = new BeanValidationBinder<>(ProjectDto.class);

    public ProjectAddForm(ProjectDto projectDto, ProjectService projectService, InstitutionService institutionService) {
        this.projectService = projectService;

        institution = new ComboBox<>(Entity.INSTITUTION, institutionService.getAll());
        institution.setItemLabelGenerator(InstitutionDto::getName);

        binder.bindInstanceFields(this);
        binder.setBean(projectDto);

        name.setMaxLength(255);
        additionalInformation.setWidthFull();
        additionalInformation.setMaxLength(500);
        additionalInformation.setValueChangeMode(ValueChangeMode.EAGER);
        additionalInformation.addValueChangeListener(e -> e.getSource()
                .setHelperText(e.getValue().length() + "/500"));

        HorizontalLayout activeLayout = new HorizontalLayout(isActive);
        activeLayout.setWidthFull();
        activeLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        Button save = new Button(Constants.SAVE, event -> save());
        Button cancel = new Button(Constants.CANCEL, event -> this.close());
        HorizontalLayout buttonLayout = new HorizontalLayout(save, cancel);
        buttonLayout.setWidthFull();
        buttonLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        FormLayout formLayout = new FormLayout(name, institution, startDate, finishDate, additionalInformation, activeLayout);

        add(formLayout, buttonLayout);
    }

    private void save() {
        try {
            if (binder.validate().isOk()) {
                ProjectDto projectDto = binder.getBean();
                ProjectDto response = projectService.save(projectDto);
                ProjectCrud.refresh();
                this.close();
            } else {
                ErrorUtils.showError(ErrorMessage.VALIDATION_FAILED);
            }
        } catch (Exception e) {
            if (e instanceof BadRequestException) {
                ErrorUtils.showError(e.getMessage());
            } else {
                UI.getCurrent().navigate(ErrorView.class);
            }
        }
    }
}
