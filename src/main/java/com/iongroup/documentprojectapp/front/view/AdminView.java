package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.component.InstitutionCrud;
import com.iongroup.documentprojectapp.front.component.UserCrud;
import com.iongroup.documentprojectapp.front.layout.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "admin", layout = MainLayout.class)
@PageTitle("Admin | DP")
public class AdminView extends VerticalLayout implements BeforeEnterObserver {

    public AdminView() {
        TabSheet tabSheet = new TabSheet();
        tabSheet.getStyle().setWidth("100%");
        tabSheet.add("Istituti",
                new InstitutionCrud());

        tabSheet.add("Utenti",
                new UserCrud());

        add(tabSheet);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        String token = CookiesManager.getJwtTokenFromCookie();
        if (!Api.getUserRoles(token).contains("Amministratore")) {
            UI.getCurrent().getPage().setLocation(Api.getDefaultPage(token));
        }
    }
}
