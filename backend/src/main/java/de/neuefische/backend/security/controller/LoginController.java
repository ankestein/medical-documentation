package de.neuefische.backend.security.controller;

import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.service.JWTUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/auth/login")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtilService jwtService;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, JWTUtilService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    @PostMapping
    public String login(@RequestBody AppUser appUser){

        this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));

        return jwtService.createToken(new HashMap<>(), appUser.getUsername());
    }

}