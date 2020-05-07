package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.UserService;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

@Path("/api/user")
@Secured({RoleType.USER, RoleType.ADMIN})
public class UserServiceImpl implements UserService {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response fetchUserData(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String username = principal.getName();
        User user = userDAO.findByUsername(username).orElseThrow(BadRequestException::new);
        return Response.ok(user).build();
    }
}