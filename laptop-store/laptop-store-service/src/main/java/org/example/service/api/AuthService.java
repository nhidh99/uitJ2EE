package org.example.service.api;

import org.example.input.RegisterInput;

import javax.ws.rs.core.Response;

public interface AuthService {
    Response login(String username, String password);
    Response register(RegisterInput registerInput);
}
