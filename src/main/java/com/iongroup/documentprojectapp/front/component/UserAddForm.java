package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.dto.RegisterRequest;
import com.iongroup.documentprojectapp.back.dto.RoleDto;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.service.InstitutionService;
import com.iongroup.documentprojectapp.back.service.RoleService;
import com.iongroup.documentprojectapp.back.service.UserService;
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
import com.vaadin.flow.component.combobox.MultiSelectComboBox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;

public class UserAddForm extends Dialog {

    private final UserService userService;

    protected final TextField username = new TextField(Field.USERNAME);
    protected final PasswordField password = new PasswordField(Field.PASSWORD);
    protected final PasswordField confirmPassword = new PasswordField(Field.CONFIRM_PASSWORD);
    protected final EmailField email = new EmailField(Field.EMAIL);
    protected final TextField name = new TextField(Field.NAME);
    protected final TextField surname = new TextField(Field.SURNAME);
    protected final TextField patronymic = new TextField(Field.PATRONYMIC);
    protected final MultiSelectComboBox<RoleDto> roles;
    protected final ComboBox<InstitutionDto> institution;
    protected final Checkbox isEnabled = new Checkbox(Field.ENABLED);
    private final BeanValidationBinder<RegisterRequest> binder = new BeanValidationBinder<>(RegisterRequest.class);

    public UserAddForm(RegisterRequest registerRequest, UserService userService, InstitutionService institutionService, RoleService roleService) {
        this.userService = userService;

        institution = new ComboBox<>(Entity.INSTITUTION, institutionService.getAll());
        institution.setItemLabelGenerator(InstitutionDto::getName);
        institution.setEnabled(false);

        roles = new MultiSelectComboBox<>(Field.ROLES, roleService.getAll());
        roles.setItemLabelGenerator(RoleDto::getName);
        roles.addValueChangeListener(multiSelectComboBoxSetComponentValueChangeEvent -> {
            if (multiSelectComboBoxSetComponentValueChangeEvent.getValue()
                    .stream()
                    .map(RoleDto::getName)
                    .toList()
                    .contains("Operatore Bancare")) {
                institution.setEnabled(true);
            } else {
                institution.clear();
                institution.setEnabled(false);
            }
        });

        binder.bindInstanceFields(this);
        binder.setBean(registerRequest);

        username.setMaxLength(32);
        name.setMaxLength(255);
        surname.setMaxLength(255);
        password.setMaxLength(255);
        confirmPassword.setMaxLength(255);
        email.setMaxLength(255);
        password.setMaxLength(255);

        HorizontalLayout enabledLayout = new HorizontalLayout(isEnabled);
        enabledLayout.setWidthFull();
        enabledLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        Button save = new Button(Constants.SAVE, event -> save());
        Button cancel = new Button(Constants.CANCEL, event -> this.close());
        HorizontalLayout buttonLayout = new HorizontalLayout(save, cancel);
        buttonLayout.setWidthFull();
        buttonLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        FormLayout formLayout = new FormLayout(
                username,
                password,
                confirmPassword,
                email,
                name,
                surname,
                patronymic,
                roles,
                institution,
                enabledLayout
                );
        add(formLayout, buttonLayout);
    }

    private void save() {
        try {
            if (binder.validate().isOk()) {
                RegisterRequest registerRequest = binder.getBean();

                if (!registerRequest.getPassword().equals(registerRequest.getConfirmPassword())) {
                    throw new BadRequestException(ErrorMessage.PASSWORD_NOT_MATCH);
                }

                userService.save(registerRequest);
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
