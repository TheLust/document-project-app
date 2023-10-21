package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.RoleDto;
import com.iongroup.documentprojectapp.back.dto.UserDto;
import com.iongroup.documentprojectapp.back.service.RoleService;
import com.iongroup.documentprojectapp.back.service.UserService;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.front.util.IMFormFactory;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.springframework.web.client.RestTemplate;
import org.vaadin.crudui.crud.CrudOperation;
import org.vaadin.crudui.crud.impl.GridCrud;
import org.vaadin.crudui.form.impl.field.provider.CheckBoxGroupProvider;
import org.vaadin.crudui.form.impl.form.factory.DefaultCrudFormFactory;
import org.vaadin.crudui.layout.impl.HorizontalSplitCrudLayout;

public class BigDataAdminCrud extends VerticalLayout {

    private final UserService userService;
    private final RoleService roleService;

    public BigDataAdminCrud() {
        this.userService = new UserService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        roleService = new RoleService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());

        add(new H1("Users"));
        add(getCrud());
    }

    private GridCrud<UserDto> getCrud() {
        GridCrud<UserDto> crud = getCrudWithGridCrudFactory();

        crud.getGrid().getColumnByKey("id").setVisible(false);
        crud.getGrid().getColumnByKey("institution").setVisible(false);
        crud.getGrid().getColumnByKey("roles").setVisible(false);
        crud.getGrid().getColumnByKey("name").setVisible(false);
        crud.getGrid().getColumnByKey("surname").setVisible(false);
        crud.getGrid().setWidthFull();

        crud.setFindAllOperation(userService::getAll);
        crud.setAddOperation(userService::save);
        crud.setUpdateOperation(userService::update);
        crud.setDeleteOperation(userService::delete);

        return crud;
    }

    private GridCrud<UserDto> getCrudWithGridCrudFactory() {
        DefaultCrudFormFactory<UserDto> formFactory = IMFormFactory.getDefaultFormFactory(UserDto.class);
        formFactory.setVisibleProperties("username", "password", "email", "name", "surname", "patronymic", "roles", "isEnabled");

        formFactory.setUseBeanValidation(CrudOperation.DELETE, false);

        formFactory.setFieldProvider("roles",
                new CheckBoxGroupProvider<>(roleService.getAll()));
        formFactory.setFieldProvider("roles",
                new CheckBoxGroupProvider<>("Roles", roleService.getAll(), RoleDto::getName));

        return new GridCrud<>(UserDto.class, new HorizontalSplitCrudLayout(), formFactory);
    }
}
