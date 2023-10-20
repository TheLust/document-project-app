package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.service.InstitutionService;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.ErrorMessage;
import com.iongroup.documentprojectapp.front.util.ErrorUtils;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextArea;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.value.ValueChangeMode;

public class InstitutionAddForm extends Dialog {

    protected final TextField code = new TextField(Field.CODE);
    protected final TextField name = new TextField(Field.NAME);
    protected final TextArea additionalInformation = new TextArea(Field.ADDITIONAL_INFORMATION);
    private final BeanValidationBinder<InstitutionDto> binder = new BeanValidationBinder<>(InstitutionDto.class);

    private final InstitutionService institutionService;

    public InstitutionAddForm(InstitutionDto institutionDto, InstitutionService institutionService) {
        this.institutionService = institutionService;
        binder.bindInstanceFields(this);
        binder.setBean(institutionDto);

        code.setWidthFull();
        code.setMaxLength(5);
        name.setWidthFull();
        name.setMaxLength(255);
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

        add(code, name, additionalInformation, buttonLayout);
    }

    private void save() {
        try {
            if (binder.validate().isOk()) {
                InstitutionDto institutionDto = binder.getBean();
                institutionService.save(institutionDto);
                InstitutionCrud.refresh();
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
