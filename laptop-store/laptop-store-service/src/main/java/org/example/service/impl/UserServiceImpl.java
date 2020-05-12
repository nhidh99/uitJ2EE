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

    @Override
    @PUT
    @Path("/me")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(@Context SecurityContext securityContext, UserInput userInput) {
        User user = buildUserFromUserInput(securityContext, userInput);
        userDAO.update(user);
        return Response.ok().build();
    }

    private User buildUserFromUserInput(@Context SecurityContext securityContext, UserInput userInput) {
        Principal principal = securityContext.getUserPrincipal();
        String id = principal.getName();
        User user = userDAO.findById(Integer.parseInt(id)).orElseThrow(BadRequestException::new);

        GenderType gender = GenderType.valueOf(userInput.getGender());
        LocalDate birthday = Instant.ofEpochMilli(userInput.getBirthday()).atZone(ZoneId.systemDefault()).toLocalDate();
        user.setName(userInput.getName());
        user.setEmail(userInput.getEmail());
        user.setPhone(userInput.getPhone());
        user.setGender(gender);
        user.setBirthday(birthday);
        return user;
    }

    @Override
    @PUT
    @Path("/me/password")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePassword(@Context SecurityContext securityContext, PasswordInput passwordInput) {
        Principal principal = securityContext.getUserPrincipal();
        String id = principal.getName();
        User user = userDAO.findById(Integer.parseInt(id)).orElseThrow(BadRequestException::new);

        try {
            if (userDAO.login(user.getUsername(), passwordInput.getOldPassword())) {
                String newHashedPassword = userDAO.hashPassword(passwordInput.getNewPassword());
                user.setPassword(newHashedPassword);
                userDAO.update(user);
                return Response.ok().build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.serverError().build();
    }
}