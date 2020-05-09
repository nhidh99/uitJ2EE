package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.input.PasswordInput;
import org.example.input.RegisterInput;
import org.example.input.UserInput;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.UserService;
import org.example.type.GenderType;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Path("/api/users")
@Secured({RoleType.USER, RoleType.ADMIN})
public class UserServiceImpl implements UserService {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUser(@Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String id = principal.getName();
        User user = userDAO.findById(Integer.parseInt(id)).orElseThrow(BadRequestException::new);
        return Response.ok(user).build();
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
            //Check oldPassword
            if(userDAO.login(user.getUsername(), passwordInput.getOldPassword())) {
                String newHashedPassword = userDAO.hashPassword(passwordInput.getNewPassword());
                user.setPassword(newHashedPassword);
                userDAO.update(user);
                return Response.ok().build();
            }
            else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Response.serverError().build();
    }
}