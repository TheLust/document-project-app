package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.RegisterRequest;
import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.service.AuthService;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.ErrorMessage;
import com.iongroup.documentprojectapp.front.util.ErrorUtils;
import com.iongroup.documentprojectapp.front.view.ErrorView;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.AnchorTargetValue;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.EmailField;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;

public class BigDataRegisterForm extends Dialog {

    private final AuthService authService;

    protected final TextField username = new TextField(Field.USERNAME);
    protected final PasswordField password = new PasswordField(Field.PASSWORD);
    protected final PasswordField confirmPassword = new PasswordField(Field.CONFIRM_PASSWORD);
    protected final EmailField email = new EmailField(Field.EMAIL);
    protected final TextField name = new TextField(Field.NAME);
    protected final TextField surname = new TextField(Field.SURNAME);
    protected final TextField patronymic = new TextField(Field.PATRONYMIC);
    protected final Checkbox isEnabled = new Checkbox(Field.ENABLED);
    protected final Checkbox accept = new Checkbox("");
    private final BeanValidationBinder<RegisterRequest> binder = new BeanValidationBinder<>(RegisterRequest.class);

    public BigDataRegisterForm(RegisterRequest registerRequest, AuthService authService) {
        this.authService = authService;

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

        Anchor anchor = new Anchor();
        anchor.setText("Privacy Policy");
        anchor.setHref("https://s.yimg.com/ny/api/res/1.2/3G214Kmm_v_0WS9in0RjFg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNg--/https://media.zenfs.com/en_us/News/digitaltrends.com/you-mad-bro-625x416.png");
        anchor.setTarget(AnchorTargetValue.forString("_blank"));
        accept.setLabel("");

        HorizontalLayout acceptLayout = new HorizontalLayout(accept, anchor);
        acceptLayout.setWidthFull();
        acceptLayout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);

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
                enabledLayout,
                acceptLayout
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

                if (!accept.isEnabled()) {
                    throw new BadRequestException("Please accept our privacy policy");
                }

                authService.register(registerRequest);
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
