package com.iongroup.documentprojectapp;

import com.iongroup.documentprojectapp.back.dto.LoginRequest;
import com.iongroup.documentprojectapp.back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@RequiredArgsConstructor
class DocumentProjectAppApplicationTests {

	private final AuthService authService;

	@Test
	void contextLoads() {
		System.out.println(authService.login(new LoginRequest("admin", "admin")));
	}

}
