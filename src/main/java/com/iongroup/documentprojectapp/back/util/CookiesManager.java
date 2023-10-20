package com.iongroup.documentprojectapp.back.util;

import com.vaadin.flow.server.VaadinService;
import jakarta.servlet.http.Cookie;

public class CookiesManager {

    public static void setHttpOnlyJwtCookie(String token) {
        Cookie jwtCookie = new Cookie("jwtToken", token);
        jwtCookie.setPath("/");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setMaxAge(24 * 60 * 60);
        VaadinService.getCurrentResponse().addCookie(jwtCookie);
    }

    public static String getJwtTokenFromCookie() {
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwtToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public static void deleteJwtCookie() {
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("jwtToken")) {
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    VaadinService.getCurrentResponse().addCookie(cookie);
                    return;
                }
            }
        }
    }

    public static void setCookie(String name, String value) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        VaadinService.getCurrentResponse().addCookie(cookie);
    }

    public static String getValueFromCookie(String name) {
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    public static void deleteCookie(String name) {
        Cookie[] cookies = VaadinService.getCurrentRequest().getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setMaxAge(0);
                    cookie.setPath("/");
                    VaadinService.getCurrentResponse().addCookie(cookie);
                    return;
                }
            }
        }
    }

}
