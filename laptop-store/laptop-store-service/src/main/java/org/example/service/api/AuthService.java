package org.example.service.api;

import org.example.input.LoginInput;
import org.example.input.RegisterInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface AuthService {
    Response login(LoginInput loginInput);
    Response register(RegisterInput registerInput);
    Response refreshToken(SecurityContext securityContext);
}
