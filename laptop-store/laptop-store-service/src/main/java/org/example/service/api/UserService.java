package org.example.service.api;

import org.example.input.PasswordInput;
import org.example.input.UserInput;

import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface UserService {
    Response fetchUserData(SecurityContext securityContext);

    Response updateCart(String cartJSON, SecurityContext securityContext);

    Response updateUser(UserInput userInput, @Context SecurityContext securityContext);

    Response updatePassword(PasswordInput passwordInput, SecurityContext securityContext);

    Response findUserAddresses(SecurityContext securityContext);

    Response findUserOrderOverviews(Integer page, SecurityContext securityContext);
}