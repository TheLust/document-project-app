package com.iongroup.documentprojectapp;

import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Theme("my-theme")
@SpringBootApplication
public class DocumentProjectAppApplication implements AppShellConfigurator {

	public static void main(String[] args) {
		SpringApplication.run(DocumentProjectAppApplication.class, args);
	}

}
