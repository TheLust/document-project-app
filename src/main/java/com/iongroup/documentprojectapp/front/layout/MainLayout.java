package com.iongroup.documentprojectapp.front.layout;

import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.view.BigDataAdminView;
import com.iongroup.documentprojectapp.front.view.LoginView;
import com.iongroup.documentprojectapp.front.view.PersonalView;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.RouterLink;

import java.util.List;

@CssImport("./themes/component-styles/layout.css")
public class MainLayout extends AppLayout {

    public MainLayout() {
        String jwtToken = CookiesManager.getJwtTokenFromCookie();

        if (jwtToken == null) {
            UI.getCurrent().getPage().setLocation("/login");
        } else {
            buildComponents(jwtToken);
        }
    }

    private void buildComponents(String token) {
        DrawerToggle toggle = new DrawerToggle();
        H1 title = new H1("Document Project");

        List<String> roles = Api.getUserRoles(token);
        if (roles.isEmpty()) {
            UI.getCurrent().navigate(LoginView.class);
            Notification.show("Jwt token not valid");
            CookiesManager.deleteJwtCookie();
            return;
        }
        addToDrawer(getTabs(roles));
        addToNavbar(toggle, title, getLogOutButton());
    }

    private Tabs getTabs(List<String> roles) {
        Tabs tabs = new Tabs();
        tabs.setOrientation(Tabs.Orientation.VERTICAL);

        if (roles.contains("Amministratore")) {
            tabs.add(createTab(VaadinIcon.USER_STAR, "Admin", BigDataAdminView.class));
        }

        tabs.add(createTab(VaadinIcon.USER, "My Account", PersonalView.class));

        return tabs;
    }

    private Tab createTab(VaadinIcon viewIcon, String viewName, Class<? extends Component> target) {
        Icon icon = viewIcon.create();

        RouterLink link = new RouterLink();
        link.add(icon, new Span(viewName));
        link.setRoute(target);
        link.setTabIndex(-1);

        return new Tab(link);
    }

    private HorizontalLayout getLogOutButton() {
        HorizontalLayout layout = new HorizontalLayout();
        layout.setWidthFull();
        layout.setJustifyContentMode(FlexComponent.JustifyContentMode.END);
        Button button =  new Button("Exit", VaadinIcon.EXIT.create(), event -> {
            CookiesManager.deleteJwtCookie();
            UI.getCurrent().navigate(LoginView.class);
        });
        button.setIconAfterText(true);
        layout.add(button);

        return layout;
    }
}
