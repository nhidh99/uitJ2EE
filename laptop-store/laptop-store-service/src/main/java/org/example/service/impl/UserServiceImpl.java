package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.UserService;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;

@Path("/api/users")
@Secured({RoleType.USER, RoleType.ADMIN})
public class UserServiceImpl implements UserService {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    public Response fetchUserData(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(Exception::new);
            ObjectMapper om = new ObjectMapper();
            String userJSON = om.writeValueAsString(user);
            return Response.ok(userJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/me/carts")
    @Consumes(MediaType.TEXT_PLAIN)
    public Response updateCart(String cartJSON, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            userDAO.saveCart(userId, cartJSON);
            return Response.noContent().build();
        } catch (NoResultException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}