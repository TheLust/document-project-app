package com.iongroup.documentprojectapp.front.view;

import com.iongroup.documentprojectapp.back.dto.DocumentDto;
import com.iongroup.documentprojectapp.back.service.DocumentService;
import com.iongroup.documentprojectapp.back.util.Api;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.component.DocumentShowForm;
import com.iongroup.documentprojectapp.front.layout.MainLayout;
import com.iongroup.documentprojectapp.front.util.ErrorUtils;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.accordion.Accordion;
import com.vaadin.flow.component.accordion.AccordionPanel;
import com.vaadin.flow.component.contextmenu.ContextMenu;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.TabSheet;
import com.vaadin.flow.router.BeforeEnterEvent;
import com.vaadin.flow.router.BeforeEnterObserver;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.StreamResource;
import org.springframework.web.client.RestTemplate;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@Route(value = "operator/bank", layout = MainLayout.class)
@PageTitle(value = "Bank Operator | DP")
public class BankOperatorView extends VerticalLayout implements BeforeEnterObserver {

    private final DocumentService documentService;

    public BankOperatorView() {
        documentService = new DocumentService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());

        TabSheet tabSheet = new TabSheet();
        tabSheet.getStyle().setWidth("100%");

        tabSheet.add("Report di Servizio",
                getFirstCategoryLayout());

        tabSheet.add("Report SLA",
                getSecondCategoryLayout());

        tabSheet.add("Progettazione",
                getThirdCategoryLayout());

        add(tabSheet);
    }

    private Accordion getFirstCategoryLayout() {
        Accordion accordion = new Accordion();

        List<DocumentDto> documents = documentService.findAllForBankOperator();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM", new Locale("it", "IT"));

        documents.stream()
                .filter(document -> document.getType().getMacro() != null)
                .filter(document -> document.getType().getMacro().getName().equals("Report di Servizio"))
                .map(document -> document.getGroupingDate().getYear())
                .distinct()
                .forEach(year -> {
                    AccordionPanel yearPanel = new AccordionPanel(String.valueOf(year));

                    documents.stream()
                            .filter(document -> document.getType().getMacro() != null)
                            .filter(document -> document.getType().getMacro().getName().equals("Report di Servizio"))
                            .filter(document -> document.getGroupingDate().getYear() == year)
                            .map(document -> document.getGroupingDate().getMonthValue())
                            .distinct()
                            .map(month -> LocalDate.of(1, month, 1))
                            .forEach(date -> {
                                AccordionPanel monthPanel = new AccordionPanel(date.format(formatter).substring(0, 1).toUpperCase() + date.format(formatter).substring(1));
                                monthPanel.getStyle().set("margin-left", "32px");

                                documents.stream()
                                        .filter(document -> document.getType().getMacro() != null)
                                        .filter(document -> document.getType().getMacro().getName().equals("Report di Servizio"))
                                        .filter(document -> document.getGroupingDate().getYear() == year && document.getGroupingDate().getMonthValue() == date.getMonthValue())
                                        .map(DocumentDto::getType)
                                        .distinct()
                                        .forEach(documentType -> {
                                            AccordionPanel typePanel = new AccordionPanel(documentType.getName());
                                            typePanel.getStyle().set("margin-left", "32px");
                                            UnorderedList list = new UnorderedList();

                                            documents.stream()
                                                    .filter(document -> document.getType().getMacro() != null)
                                                    .filter(document -> document.getType().getMacro().getName().equals("Report di Servizio"))
                                                    .filter(document -> document.getGroupingDate().getYear() == year && document.getGroupingDate().getMonthValue() == date.getMonthValue())
                                                    .filter(document -> document.getType().equals(documentType))
                                                    .forEach(document -> {
                                                        ListItem listItem = new ListItem(document.getName());

                                                        ContextMenu contextMenu = new ContextMenu();
                                                        contextMenu.addItem("Scarica", event -> download(document));
                                                        contextMenu.addItem("Info", event -> new DocumentShowForm(document).open());
                                                        contextMenu.setTarget(listItem);

                                                        list.add(listItem);
                                                    });

                                            typePanel.addContent(list);
                                            monthPanel.addContent(typePanel);
                                        });

                                yearPanel.addContent(monthPanel);
                            });

                    accordion.add(yearPanel);
                });

        return accordion;
    }

    private Accordion getSecondCategoryLayout() {
        Accordion accordion = new Accordion();

        List<DocumentDto> documents = documentService.findAllForBankOperator();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM", new Locale("it", "IT"));

        documents.stream()
                .filter(document -> document.getType().getName().equals("Report SLA"))
                .map(document -> document.getGroupingDate().getYear())
                .distinct()
                .forEach(year -> {
                    AccordionPanel yearPanel = new AccordionPanel(String.valueOf(year));

                    documents.stream()
                            .filter(document -> document.getType().getName().equals("Report SLA"))
                            .filter(document -> document.getGroupingDate().getYear() == year)
                            .map(document -> document.getGroupingDate().getMonthValue())
                            .distinct()
                            .map(month -> LocalDate.of(1, month, 1))
                            .forEach(date -> {
                                AccordionPanel monthPanel = new AccordionPanel(date.format(formatter).substring(0, 1).toUpperCase() + date.format(formatter).substring(1));
                                monthPanel.getStyle().set("margin-left", "32px");
                                UnorderedList list = new UnorderedList();
                                documents.stream()
                                        .filter(document -> document.getType().getName().equals("Report SLA"))
                                        .filter(document -> document.getGroupingDate().getYear() == year && document.getGroupingDate().getMonthValue() == date.getMonthValue())
                                        .forEach(document -> {
                                            ListItem listItem = new ListItem(document.getName());

                                            ContextMenu contextMenu = new ContextMenu();
                                            contextMenu.addItem("Scarica", event -> download(document));
                                            contextMenu.addItem("Info", event -> new DocumentShowForm(document).open());
                                            contextMenu.setTarget(listItem);
                                            list.add(listItem);
                                        });
                                monthPanel.addContent(list);
                                yearPanel.addContent(monthPanel);
                            });

                    accordion.add(yearPanel);
                });

        return accordion;
    }

    private Accordion getThirdCategoryLayout() {
        Accordion accordion = new Accordion();

        List<DocumentDto> documents = documentService.findAllForBankOperator();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM", new Locale("it", "IT"));

        documents.stream()
                .filter(document -> document.getType().getMacro() != null)
                .filter(document -> document.getType().getMacro().getName().equals("Progettazione"))
                .map(document -> document.getGroupingDate().getYear())
                .distinct()
                .forEach(year -> {
                    AccordionPanel yearPanel = new AccordionPanel(String.valueOf(year));

                    documents.stream()
                            .filter(document -> document.getType().getMacro() != null)
                            .filter(document -> document.getType().getMacro().getName().equals("Progettazione"))
                            .filter(document -> document.getGroupingDate().getYear() == year)
                            .map(document -> document.getGroupingDate().getMonthValue())
                            .distinct()
                            .map(month -> LocalDate.of(1, month, 1))
                            .forEach(date -> {
                                AccordionPanel monthPanel = new AccordionPanel(date.format(formatter).substring(0, 1).toUpperCase() + date.format(formatter).substring(1));
                                monthPanel.getStyle().set("margin-left", "32px");

                                documents.stream()
                                        .filter(document -> document.getType().getMacro() != null)
                                        .filter(document -> document.getType().getMacro().getName().equals("Progettazione"))
                                        .filter(document -> document.getGroupingDate().getYear() == year && document.getGroupingDate().getMonthValue() == date.getMonthValue())
                                        .map(DocumentDto::getType)
                                        .distinct()
                                        .forEach(documentType -> {
                                            AccordionPanel typePanel = new AccordionPanel(documentType.getName());
                                            typePanel.getStyle().set("margin-left", "32px");
                                            UnorderedList list = new UnorderedList();

                                            documents.stream()
                                                    .filter(document -> document.getType().getMacro() != null)
                                                    .filter(document -> document.getType().getMacro().getName().equals("Progettazione"))
                                                    .filter(document -> document.getGroupingDate().getYear() == year && document.getGroupingDate().getMonthValue() == date.getMonthValue())
                                                    .filter(document -> document.getType().equals(documentType))
                                                    .forEach(document -> {
                                                        ListItem listItem = new ListItem(document.getName());

                                                        ContextMenu contextMenu = new ContextMenu();
                                                        contextMenu.addItem("Scarica", event -> download(document));
                                                        contextMenu.addItem("Info", event -> new DocumentShowForm(document).open());
                                                        contextMenu.setTarget(listItem);

                                                        list.add(listItem);
                                                    });

                                            typePanel.addContent(list);
                                            monthPanel.addContent(typePanel);
                                        });

                                yearPanel.addContent(monthPanel);
                            });

                    accordion.add(yearPanel);
                });

        return accordion;
    }

    private void download(DocumentDto documentDto) {
        StreamResource resource = getStreamResource(documentDto);
        Anchor anchor = new Anchor(resource, "");
        anchor.setHref(resource);
        anchor.getElement().setAttribute("download", true);
        add(anchor);
        anchor.getElement().executeJs("this.click()");
    }

    private StreamResource getStreamResource(DocumentDto documentDto) {
        return new StreamResource(documentDto.getName(), () -> {
            try {
                InputStream inputStream = documentService.download(documentDto).getInputStream();
                byte[] buffer = new byte[1024];
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                int length;
                while ((length = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, length);
                }
                inputStream.close();
                return new ByteArrayInputStream(outputStream.toByteArray());
            } catch (Exception e) {
                ErrorUtils.showError("Something went wrong");
                return null;
            }
        });
    }

    @Override
    public void beforeEnter(BeforeEnterEvent beforeEnterEvent) {
        String token = CookiesManager.getJwtTokenFromCookie();
        if (!Api.getUserRoles(token).contains("Operatore Bancare")) {
            UI.getCurrent().getPage().setLocation(Api.getDefaultPage(token));
        }
    }
}
