package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.component.DocumentCrud;
import com.iongroup.documentprojectapp.front.component.ProjectCrud;
import com.iongroup.documentprojectapp.front.layout.MainLayout;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

@Route(value = "operator/cedacri", layout = MainLayout.class)
@PageTitle("Cedacri Operator | DP")
public class CedacriOperatorView extends VerticalLayout implements BeforeEnterObserver {

    public CedacriOperatorView() {
        TabSheet tabSheet = new TabSheet();
        tabSheet.getStyle().setWidth("100%");
        tabSheet.add("Documenti",
                new DocumentCrud());

        tabSheet.add("Progetti",
                new ProjectCrud());

        add(tabSheet);
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        String token = CookiesManager.getJwtTokenFromCookie();
        if (!Api.getUserRoles(token).contains("Operatore Cedacri")) {
            UI.getCurrent().getPage().setLocation(Api.getDefaultPage(token));
        }
    }
}
