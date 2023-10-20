package com.iongroup.documentprojectapp.back.util;

import com.iongroup.documentprojectapp.back.service.AuthService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

import java.util.List;

public class Api {

    private static final AuthService authService = new AuthService(new RestTemplate());

    public static final String URL = "http://localhost:8080/api/v1/";
    public static final String AUTH = URL + "auth/";

    public static String getHighestRole(String token) {
        List<String> roles = authService.getRolesFromToken(token);

        if (roles.contains("Amministratore")) {
            return "Amministratore";
        }

        if (roles.contains("Operatore Cedacri")) {
            return "Operatore Cedacri";
        }

        if (roles.contains("Operatore Bancare")) {
            return "Operatore Bancare";
        }

        return null;
    }

    public static List<String> getUserRoles(String token) {
        return authService.getRolesFromToken(token);
    }

    public static String getDefaultPage(String token) {
        String role = getHighestRole(token);

        if (role.equals("Amministratore")) {
            return "/admin";
        }

        if (role.equals("Operatore Cedacri")) {
            return "/operator/cedacri";
        }

        return  "/operator/bank";
    }

    public static HttpEntity<String> setHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>(headers);
    }

    public static HttpEntity<String> setHeader(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);
        return new HttpEntity<>(headers);
    }

    public static HttpEntity<Object> setHeader(Object object) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return new HttpEntity<>(object, headers);
    }

    public static HttpEntity<Object> setHeader(Object object, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);
        return new HttpEntity<>(object, headers);
    }
}
