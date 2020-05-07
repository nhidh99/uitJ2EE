package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.UserService;
import org.example.type.Role;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

@Path("/api/user")
@Secured({Role.ROLE_USER, Role.ROLE_ADMIN})
public class UserServiceImpl implements UserService {

    @Inject
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response fetchUserData(@Context SecurityContext securityContext) {
        // GET Logged User
        Principal principal = securityContext.getUserPrincipal();
        String username = principal.getName();
        User user = userDAO.findByUsername(username);
        return Response.ok(user).build();
    }
}
