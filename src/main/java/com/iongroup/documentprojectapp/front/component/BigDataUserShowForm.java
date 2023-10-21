package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.UserDto;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.service.PersonalService;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.ErrorMessage;
import com.iongroup.documentprojectapp.front.util.ErrorUtils;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;

public class BigDataUserShowForm extends VerticalLayout {

    private final PersonalService personalService;

    protected final TextField username = new TextField(Field.USERNAME);
    protected final PasswordField password = new PasswordField(Field.PASSWORD);
    protected final EmailField email = new EmailField(Field.EMAIL);
    protected final TextField name = new TextField(Field.NAME);
    protected final TextField surname = new TextField(Field.SURNAME);
    protected final TextField patronymic = new TextField(Field.PATRONYMIC);
    protected final Checkbox isEnabled = new Checkbox(Field.ENABLED);
    private final BeanValidationBinder<UserDto> binder = new BeanValidationBinder<>(UserDto.class);

    public BigDataUserShowForm(PersonalService personalService) {
        this.personalService = personalService;

        binder.bindInstanceFields(this);
        binder.setBean(personalService.find());

        username.setMaxLength(32);
        name.setMaxLength(255);
        surname.setMaxLength(255);
        password.setMaxLength(255);
        email.setMaxLength(255);
        password.setMaxLength(255);

        HorizontalLayout enabledLayout = new HorizontalLayout(isEnabled);
        enabledLayout.setWidthFull();
        enabledLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        Button save = new Button(Constants.SAVE, event -> save());
        HorizontalLayout buttonLayout = new HorizontalLayout(save);
        buttonLayout.setWidthFull();
        buttonLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

        FormLayout formLayout = new FormLayout(
                username,
                password,
                email,
                name,
                surname,
                patronymic,
                enabledLayout
                );
        add(formLayout, buttonLayout);
    }

    private void save() {
        try {
            if (binder.validate().isOk()) {
                UserDto userDto = binder.getBean();
                personalService.update(userDto);
                UI.getCurrent().getPage().reload();
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
