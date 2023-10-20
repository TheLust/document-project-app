package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.front.layout.MainLayout;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.html.IFrame;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route(value = "/server-error", layout = MainLayout.class)
@CssImport("./themes/component-styles/error.css")
public class ErrorView extends VerticalLayout {
    public ErrorView() {
        setClassName("error-div");
        getElement().setAttribute("scrolling", "no");

        IFrame iFrame = new IFrame("error.html");
        iFrame.setClassName("error-frame");
        iFrame.getElement().setAttribute("scrolling", "no");
        add(iFrame);
    }
}
