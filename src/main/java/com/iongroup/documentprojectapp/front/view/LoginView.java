package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.back.exception.BadRequestException;
import com.iongroup.documentprojectapp.back.dto.LoginRequest;
import com.iongroup.documentprojectapp.back.service.AuthService;
import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.login.LoginForm;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Route("login")
@PageTitle("Login | DP")
@AnonymousAllowed
public class LoginView extends VerticalLayout implements BeforeEnterObserver {

    private final LoginForm login = new LoginForm();
    private final AuthService authService = new AuthService(new RestTemplate());

    public LoginView(){
        addClassName("login-view");
        setSizeFull();
        setAlignItems(Alignment.CENTER);
        setJustifyContentMode(JustifyContentMode.CENTER);

        login.setForgotPasswordButtonVisible(false);
        login.addLoginListener(event -> {
            if (event.getUsername().isBlank() && event.getPassword().isBlank()) {
                Notification.show("Fill out all fields", 2000, Notification.Position.TOP_CENTER)
                        .addThemeVariants(NotificationVariant.LUMO_ERROR);
            } else {
                try {
                    String token = authService.login(new LoginRequest(event.getUsername(), event.getPassword()));

                    if (token != null) {
                        CookiesManager.setHttpOnlyJwtCookie(token);

                        UI.getCurrent().getPage().setLocation(Api.getDefaultPage(token));
                    }

                } catch (BadRequestException | ResourceAccessException e) {
                    event.getSource().setError(true);

                    if (e instanceof ResourceAccessException) {
                        UI.getCurrent().navigate(ErrorView.class);
                    }
                }
            }

            event.getSource().onEnabledStateChanged(true);
        });

        add(login);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        // inform the user about an authentication error
        if(beforeEnterEvent.getLocation()
                .getQueryParameters()
                .getParameters()
                .containsKey("error")) {
            login.setError(true);
        }
    }
}
