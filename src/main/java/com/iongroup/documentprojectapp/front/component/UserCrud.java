package com.iongroup.documentprojectapp.front.component;

import com.iongroup.documentprojectapp.back.dto.PasswordChangeRequest;
import com.iongroup.documentprojectapp.back.dto.RegisterRequest;
import com.iongroup.documentprojectapp.back.dto.UserDto;
import com.iongroup.documentprojectapp.back.service.InstitutionService;
import com.iongroup.documentprojectapp.back.service.RoleService;
import com.iongroup.documentprojectapp.back.service.UserService;
import com.iongroup.documentprojectapp.back.util.CookiesManager;
import com.iongroup.documentprojectapp.back.util.Entity;
import com.iongroup.documentprojectapp.back.util.Field;
import com.iongroup.documentprojectapp.front.util.Constants;
import com.iongroup.documentprojectapp.front.util.DPFormFactory;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.grid.contextmenu.GridContextMenu;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import org.springframework.web.client.RestTemplate;
import org.vaadin.crudui.crud.impl.GridCrud;

import java.util.Comparator;
import java.util.Optional;

public class UserCrud extends VerticalLayout {

    private final UserService userService;
    private final InstitutionService institutionService;
    private final RoleService roleService;
    private static GridCrud<UserDto> crud;

    public UserCrud() {
        userService = new UserService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        institutionService = new InstitutionService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        roleService = new RoleService(new RestTemplate(), CookiesManager.getJwtTokenFromCookie());
        crud = getCrud();

        add(crud);
        add(new Button(Entity.USER + " " + Constants.NEW, event -> new UserAddForm(
                new RegisterRequest(),
                userService,
                institutionService,
                roleService
        ).open()));
    }

    private GridCrud<UserDto> getCrud() {
        GridCrud<UserDto> crud = new GridCrud<>(UserDto.class, DPFormFactory.getDefaultFormFactory(UserDto.class));

        crud.getGrid().removeAllColumns();
        crud.getGrid().addColumn(UserDto::getUsername).setHeader(Field.NAME + " " + Entity.USER).setSortable(true);
        crud.getGrid().addColumn(UserDto::getFullName).setHeader(Field.NAME + " " + Field.SURNAME).setSortable(true);
        crud.getGrid().addColumn(UserDto::getEmail).setHeader(Field.EMAIL).setSortable(true);
        crud.getGrid().addColumn(UserDto::getIsEnabled)
                .setHeader(Field.ENABLED)
                .setSortable(true)
                .setComparator(Comparator.comparing(UserDto::getIsEnabled))
                .setRenderer(new ComponentRenderer<>(userDto -> {
                    Checkbox checkbox = new Checkbox();
                    checkbox.setValue(userDto.getIsEnabled());
                    checkbox.setEnabled(false);
                    return checkbox;
                }));

        crud.getGrid().setColumnReorderingAllowed(true);

        crud.setFindAllOperation(userService::getAll);

        crud.setAddOperationVisible(false);
        crud.setUpdateOperationVisible(false);
        crud.setDeleteOperationVisible(false);
        crud.setFindAllOperationVisible(false);

        GridContextMenu<UserDto> contextMenu = crud.getGrid().addContextMenu();
        contextMenu.addItem("Reset password", userDtoGridContextMenuItemClickEvent -> {
            Optional<UserDto> userDto = userDtoGridContextMenuItemClickEvent.getItem();
            if (userDto.isPresent()) {
                new ChangePasswordForm(new PasswordChangeRequest(), userDto.get().getId(), userService).open();
                UserCrud.refresh();
            }
        });
        contextMenu.addItem("Abilita/Disabilita", userDtoGridContextMenuItemClickEvent -> {
            Optional<UserDto> userDto = userDtoGridContextMenuItemClickEvent.getItem();
            if (userDto.isPresent()) {
                userService.able(userDto.get());
                UserCrud.refresh();
            }
        });

        return crud;
    }

    public static void refresh() {
        crud.refreshGrid();
    }
}
