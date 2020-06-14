package com.example.controller;

import com.example.model.User;
import com.example.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/rest/v1/users")
public class UserControllerV1 {
    private UserService userService;

    @Inject
    public UserControllerV1(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET, headers = {"Accept=application/json"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    List<User> getUsers() {
        return userService.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, headers = {"Accept=application/json"})
    @ResponseStatus(HttpStatus.OK)
    public @ResponseBody
    User getUserById(@PathVariable("id") Integer id) throws Exception {
        return userService.findById(id).orElseThrow(Exception::new);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("id") Integer id) throws Exception {
        User user = userService.findById(id).orElseThrow(Exception::new);
        userService.delete(user);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT, headers = {"Content-Type=application/json"})
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateUser(@PathVariable("id") Integer id, @RequestBody User newUser) throws Exception {
        boolean isValidRequest = newUser.getId().equals(id) && userService.findById(id).isPresent();
        if (isValidRequest) {
            userService.save(newUser);
        } else {
            throw new Exception();
        }
    }

    @RequestMapping(value = "/", method = RequestMethod.POST, headers = {"Content-Type=application/json"})
    @ResponseStatus(HttpStatus.CREATED)
    public @ResponseBody User postUser(@RequestBody User newUser) throws Exception {
        boolean isInvalidRequest = newUser.getId() != null;
        if (isInvalidRequest) throw new Exception();
        return userService.save(newUser);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    private @ResponseBody
    Map<String, Object> handleException(Exception e) {
        Map<String, Object> result = new HashMap<>();
        result.put("error", true);
        result.put("error_message", e.getMessage());
        return result;
    }
}
