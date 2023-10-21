package com.iongroup.documentprojectapp.front.view;


import com.iongroup.documentprojectapp.back.service.PersonalService;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.component.BigDataUserShowForm;
import com.iongroup.documentprojectapp.front.layout.MainLayout;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import org.springframework.web.client.RestTemplate;

@Route(value = "personal", layout = MainLayout.class)
@PageTitle("My Account")
public class PersonalView extends VerticalLayout {

    private final PersonalService personalService;

    public PersonalView() {
        personalService = new PersonalService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        BigDataUserShowForm bigDataUserShowForm = new BigDataUserShowForm(personalService);
        add(new H1("My Account"));
        add(bigDataUserShowForm);
    }
}
