package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.PasswordChangeRequest;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.service.UserService;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.ErrorMessage;
import com.iongroup.documentprojectapp.front.util.ErrorUtils;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.data.binder.BeanValidationBinder;

public class ChangePasswordForm extends Dialog {
    private final UserService userService;

    protected final PasswordField password = new PasswordField(Field.PASSWORD);
    private final BeanValidationBinder<PasswordChangeRequest> binder = new BeanValidationBinder<>(PasswordChangeRequest.class);

    public ChangePasswordForm(PasswordChangeRequest passwordChangeRequest, Long id, UserService userService) {
        this.userService = userService;
        passwordChangeRequest.setId(id);

        binder.bindInstanceFields(this);
        binder.setBean(passwordChangeRequest);

        password.setMaxLength(255);
        password.setWidthFull();

        Button save = new Button(Constants.SAVE, event -> save());
        Button cancel = new Button(Constants.CANCEL, event -> this.close());
        HorizontalLayout buttonLayout = new HorizontalLayout(save, cancel);
        buttonLayout.setWidthFull();
        buttonLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        FormLayout formLayout = new FormLayout(
                password
                );
        add(formLayout, buttonLayout);
    }

    private void save() {
        try {
            if (binder.validate().isOk()) {
                PasswordChangeRequest passwordChangeRequest = binder.getBean();
                userService.changePassword(passwordChangeRequest);
                UserCrud.refresh();
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
