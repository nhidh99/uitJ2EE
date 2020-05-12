package org.example.service.api;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface UserService {
    Response fetchUserData(SecurityContext securityContext);

    Response updateCart(String cartJSON, SecurityContext securityContext);

    Response findUser(SecurityContext securityContext);

    Response updateUser(SecurityContext securityContext, UserInput userInput);

    Response updatePassword(SecurityContext securityContext, PasswordInput passwordInput);
}
