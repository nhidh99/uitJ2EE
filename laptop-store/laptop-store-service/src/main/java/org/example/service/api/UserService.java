package org.example.service.api;

import org.example.input.PasswordInput;
import org.example.input.RegisterInput;
import org.example.input.UserInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface UserService {
    Response findUser(SecurityContext securityContext);
    Response updateUser(SecurityContext securityContext, UserInput userInput);
    Response updatePassword(SecurityContext securityContext, PasswordInput passwordInput);
}
