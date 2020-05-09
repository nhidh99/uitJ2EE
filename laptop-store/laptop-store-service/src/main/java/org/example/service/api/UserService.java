package org.example.service.api;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface UserService {
    Response fetchUserData(SecurityContext securityContext);

    Response updateCart(String cartJSON, SecurityContext securityContext);
}
