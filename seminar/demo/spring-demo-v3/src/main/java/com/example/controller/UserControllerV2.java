package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest/v2/users")
public class UserControllerV2 {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserById(@PathVariable("id") Integer id) {
        Optional<User> optUser = userService.findById(id);
        return optUser.isPresent()
                ? ResponseEntity.ok(optUser.get())
                : ResponseEntity.badRequest().build();
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable("id") Integer id) {
        Optional<User> optUser = userService.findById(id);
        if (optUser.isPresent()) {
            userService.delete(optUser.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@PathVariable("id") Integer id, @RequestBody User newUser) throws Exception {
        boolean isValidRequest = newUser.getId().equals(id) && userService.findById(id).isPresent();
        if (isValidRequest) {
            userService.save(newUser);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postUser(@RequestBody User newUser) throws Exception {
        boolean isInvalidRequest = newUser.getId() != null;
        if (isInvalidRequest) {
            return ResponseEntity.badRequest().build();
        }
        userService.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
