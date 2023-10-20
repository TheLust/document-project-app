package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.InstitutionDto;
import com.iongroup.documentprojectapp.back.service.InstitutionService;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.back.util.Entity;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.DPFormFactory;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.springframework.web.client.RestTemplate;
import org.vaadin.crudui.crud.impl.GridCrud;

public class InstitutionCrud extends VerticalLayout {

    private final InstitutionService institutionService;

    private static GridCrud<InstitutionDto> crud;

    public InstitutionCrud() {
        institutionService = new InstitutionService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        crud = getCrud();

        add(crud);
        add(new Button(Entity.INSTITUTION + " " + Constants.NEW, event -> new InstitutionAddForm(new InstitutionDto(), institutionService).open()));
    }

    private GridCrud<InstitutionDto> getCrud() {
        GridCrud<InstitutionDto> crud = new GridCrud<>(InstitutionDto.class, DPFormFactory.getDefaultFormFactory(InstitutionDto.class));

        crud.getGrid().removeAllColumns();
        crud.getGrid().addColumn(InstitutionDto::getCode).setHeader(Field.CODE + " " + Entity.INSTITUTION).setSortable(true);
        crud.getGrid().addColumn(InstitutionDto::getName).setHeader(Field.NAME + " " + Entity.INSTITUTION).setSortable(true);
        crud.getGrid().addColumn(InstitutionDto::getAdditionalInformation).setHeader(Field.INFORMATION).setSortable(true);
        crud.getGrid().setColumnReorderingAllowed(true);

        crud.setFindAllOperation(institutionService::getAll);

        crud.setAddOperationVisible(false);
        crud.setUpdateOperationVisible(false);
        crud.setDeleteOperationVisible(false);
        crud.setFindAllOperationVisible(false);

        return crud;
    }

    public static void refresh() {
        crud.refreshGrid();
    }
}
