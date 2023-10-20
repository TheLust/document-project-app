package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.Route;

@Route(value = "", layout = AppLayout.class)
public class MainView extends VerticalLayout implements BeforeEnterObserver {

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        String token = CookiesManager.getJwtTokenFromCookie();
        if (token == null) {
            UI.getCurrent().getPage().setLocation("/login");
        } else {
            UI.getCurrent().getPage().setLocation(Api.getDefaultPage(token));
        }
    }
}
