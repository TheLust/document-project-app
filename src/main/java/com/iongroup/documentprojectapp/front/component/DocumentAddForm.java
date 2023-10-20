package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.DocumentDto;
import com.iongroup.documentprojectapp.back.dto.DocumentTypeDto;
import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.dto.ProjectDto;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.service.DocumentService;
import com.iongroup.documentprojectapp.back.service.DocumentTypeService;
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
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.value.ValueChangeMode;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;

public class DocumentAddForm extends Dialog {

    private final DocumentService documentService;
    private Upload upload;
    private InputStream inputStream;
    private String fileName;

    protected final ComboBox<InstitutionDto> institution;
    protected final ComboBox<DocumentTypeDto> macro;
    protected final ComboBox<DocumentTypeDto> type;
    protected final ComboBox<ProjectDto> project;
    protected final DatePicker groupingDate = new DatePicker(Field.GROUPING_DATE);
    protected final TextArea additionalInformation = new TextArea(Field.ADDITIONAL_INFORMATION);
    private final BeanValidationBinder<DocumentDto> binder = new BeanValidationBinder<>(DocumentDto.class);

    public DocumentAddForm(DocumentDto documentDto,
                           DocumentService documentService,
                           InstitutionService institutionService,
                           DocumentTypeService documentTypeService,
                           ProjectService projectService) {
        this.documentService = documentService;

        MemoryBuffer buffer = new MemoryBuffer();
        upload = new Upload(buffer);

        upload.setAcceptedFileTypes(".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf");


        int maxFileSizeInBytes = 10 * 1024 * 1024; // 10MB
        upload.setMaxFileSize(maxFileSizeInBytes);

        upload.addSucceededListener(event -> {
            inputStream = buffer.getInputStream();
            fileName = event.getFileName();
        });

        upload.addFileRejectedListener(event -> ErrorUtils.showError(event.getErrorMessage()));

        project = new ComboBox<>(Entity.PROJECT);
        project.setItemLabelGenerator(ProjectDto::getName);
        project.setEnabled(false);

        institution = new ComboBox<>(Entity.INSTITUTION, institutionService.getAll());
        institution.setItemLabelGenerator(InstitutionDto::getName);
        institution.addValueChangeListener(comboBoxInstitutionDtoComponentValueChangeEvent -> {
            if (comboBoxInstitutionDtoComponentValueChangeEvent.getValue() != null) {
                project.setItems(projectService.getAllByInstitution(comboBoxInstitutionDtoComponentValueChangeEvent.getValue()));
            } else {
                project.setItems(Collections.emptyList());
            }
        });

        type = new ComboBox<>(Field.MICRO);
        type.setItemLabelGenerator(DocumentTypeDto::getName);
        type.setEnabled(false);

        macro = new ComboBox<>(Field.MACRO, documentTypeService.getMacros());
        macro.setItemLabelGenerator(DocumentTypeDto::getName);
        macro.addValueChangeListener(comboBoxDocumentTypeDtoComponentValueChangeEvent -> {
            if (comboBoxDocumentTypeDtoComponentValueChangeEvent.getValue().getName().equals("Progettazione")) {
                project.setEnabled(true);
            } else {
                project.clear();
                project.setEnabled(false);
            }

            if (comboBoxDocumentTypeDtoComponentValueChangeEvent.getValue() != null) {
                type.setEnabled(true);
                List<DocumentTypeDto> items = documentTypeService.getMicrosForMacro(comboBoxDocumentTypeDtoComponentValueChangeEvent.getValue());
                if (!items.isEmpty()) {
                    type.setItems(items);
                } else {
                    type.clear();
                    type.setItems(Collections.emptyList());
                    type.setEnabled(false);
                }
            } else {
                type.clear();
                type.setItems(Collections.emptyList());
                type.setEnabled(false);
            }
        });

        binder.bindInstanceFields(this);
        binder.setBean(documentDto);

        additionalInformation.setWidthFull();
        additionalInformation.setMaxLength(500);
        additionalInformation.setValueChangeMode(ValueChangeMode.EAGER);
        additionalInformation.addValueChangeListener(e -> e.getSource()
                .setHelperText(e.getValue().length() + "/500"));

        Button save = new Button(Constants.SAVE, event -> save());
        Button cancel = new Button(Constants.CANCEL, event -> this.close());
        HorizontalLayout buttonLayout = new HorizontalLayout(save, cancel);
        buttonLayout.setWidthFull();
        buttonLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        FormLayout formLayout = new FormLayout(upload, institution, macro, type, project, groupingDate, additionalInformation);

        add(formLayout, buttonLayout);
    }

    private void save() {
        try {
            if (binder.validate().isOk()) {
                DocumentDto documentDto = binder.getBean();
                if (type.isEmpty()) {
                    documentDto.setType(macro.getValue());
                }
                if (fileName == null) {
                    throw new BadRequestException("Something went wrong with the file");
                }
                documentDto.setName(fileName);
                documentService.save(documentDto, inputStream);
                DocumentCrud.refresh();
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
