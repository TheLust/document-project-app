package com.iongroup.documentprojectapp.front.util;

import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;

import java.util.Arrays;

public class ErrorUtils {

    public static void showError(String message) {
        String[] errors = message.replaceAll("; ", ";").split(";");
        for (String error : Arrays.stream(errors).toList()) {
            Notification notification = new Notification(error, 3000);
            notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
            notification.open();
        }

    }
}
