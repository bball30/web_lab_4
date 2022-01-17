package com.example.lab4.controllers;

import com.example.lab4.jwt.JwtUtils;
import com.example.lab4.jwt.UserTokenEntity;
import com.example.lab4.models.User;
import com.example.lab4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtils jwtUtils;

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    @CrossOrigin
    private ResponseEntity<?> register(@Validated @RequestBody User user, HttpSession session) {
        if (!userService.saveUser(user)) {
            return ResponseEntity.badRequest().body("К сожалению, имя " + user.getUsername() + " уже занято");
        }
        return ResponseEntity.ok().body(String.format("{\"user\": \"%s\"}", user.getUsername()));
    }

    @PostMapping("/login")
    @CrossOrigin
    private ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        try {
            User dbUser = (User) userService.loadUserByUsername(user.getUsername());
            if (dbUser == null) {
                throw new IllegalArgumentException();
            } else if (!bCryptPasswordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
                throw new IllegalAccessException();
            } else {
                String token = jwtUtils.generateJwtToken(user.getUsername());
                return ResponseEntity.ok().body(String.format("{\"token\": \"%s\"}", token));
            }
        } catch (UsernameNotFoundException | IllegalArgumentException | IllegalAccessException e) {
            return ResponseEntity.badRequest().body("Неверный логин или пароль");
        }
    }

}
