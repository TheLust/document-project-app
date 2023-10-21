package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.component.BigDataAdminCrud;
import com.iongroup.documentprojectapp.front.layout.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "bigdata/admin", layout = MainLayout.class)
@PageTitle("Admin")
public class BigDataAdminView extends VerticalLayout implements BeforeEnterObserver {

    public BigDataAdminView() {
        BigDataAdminCrud bigDataAdminCrud = new BigDataAdminCrud();
        add(bigDataAdminCrud);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        String token = CookiesManager.getJwtTokenFromCookie();
        if (!Api.getUserRoles(token).contains("Amministratore")) {
            UI.getCurrent().getPage().setLocation(Api.getDefaultPage(token));
        }
    }
}
