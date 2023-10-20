package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.DocumentDto;
import com.iongroup.documentprojectapp.back.dto.DocumentTypeDto;
import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.dto.ProjectDto;
import com.iongroup.documentprojectapp.back.util.Entity;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;

import java.util.Collections;

public class DocumentShowForm extends Dialog {
    protected final ComboBox<InstitutionDto> institution;
    protected final ComboBox<DocumentTypeDto> macro;
    protected final ComboBox<DocumentTypeDto> type;
    protected final ComboBox<ProjectDto> project;
    protected final DatePicker groupingDate = new DatePicker(Field.GROUPING_DATE);
    protected final TextArea additionalInformation = new TextArea(Field.ADDITIONAL_INFORMATION);
    protected final TextField user = new TextField(Entity.USER);

    public DocumentShowForm(DocumentDto documentDto) {
        project = new ComboBox<>(Entity.PROJECT, Collections.emptyList());
        project.setItemLabelGenerator(ProjectDto::getName);
        project.setValue(documentDto.getProject());
        project.setReadOnly(true);

        institution = new ComboBox<>(Entity.INSTITUTION, Collections.emptyList());
        institution.setItemLabelGenerator(InstitutionDto::getName);
        institution.setValue(documentDto.getInstitution());
        institution.setReadOnly(true);

        type = new ComboBox<>(Field.MICRO, Collections.emptyList());
        type.setItemLabelGenerator(DocumentTypeDto::getName);
        type.setReadOnly(true);

        macro = new ComboBox<>(Field.MACRO, Collections.emptyList());
        macro.setItemLabelGenerator(DocumentTypeDto::getName);
        macro.setReadOnly(true);

        if (documentDto.getType().getMacro() != null) {
            macro.setValue(documentDto.getType().getMacro());
            type.setValue(documentDto.getType());
        } else {
            macro.setValue(documentDto.getType());
        }

        groupingDate.setValue(documentDto.getGroupingDate());
        groupingDate.setReadOnly(true);

        additionalInformation.setWidthFull();
        additionalInformation.setValue(documentDto.getAdditionalInformation());
        additionalInformation.setReadOnly(true);

        user.setValue(documentDto.getUser().getFullName());
        user.setReadOnly(true);

        Button cancel = new Button(Constants.CANCEL, event -> this.close());
        HorizontalLayout buttonLayout = new HorizontalLayout(cancel);
        buttonLayout.setWidthFull();
        buttonLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        FormLayout formLayout = new FormLayout(institution, macro, type, project, groupingDate, additionalInformation, user);

        add(formLayout, buttonLayout);
    }
}
