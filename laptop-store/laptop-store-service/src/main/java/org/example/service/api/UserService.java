package org.example.service.api;

import org.example.input.RegisterInput;
import org.example.model.User;

import javax.ws.rs.core.Response;

public interface UserService {
    Response login(String username, String password);
    Response register(RegisterInput registerInput);
}
