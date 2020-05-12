package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.AuthService;
import org.example.type.GenderType;
import org.example.type.RoleType;
import org.example.util.api.JwtUtils;

import javax.ejb.EJB;
import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

@Path("/api/auth")
public class AuthServiceImpl implements AuthService {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @EJB(mappedName = "JwtUtilsImpl")
    private JwtUtils jwtUtils;

    @Override
    @POST
    @Path("/login")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(LoginInput loginInput) {
        try {
            String username = loginInput.getUsername();
            String password = loginInput.getPassword();
            if (userDAO.login(username, password)) {
                User user = userDAO.findByUsername(username).orElseThrow(NoResultException::new);
                String token = jwtUtils.issueToken(user.getId());
                return Response.ok(token).build();
            }
            return Response.status(Response.Status.UNAUTHORIZED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(RegisterInput registerInput) {
        try {
            GenderType gender = GenderType.valueOf(registerInput.getGender());
            LocalDate birthday = Instant.ofEpochMilli(registerInput.getBirthday())
                    .atZone(ZoneId.systemDefault()).toLocalDate();

            if (userDAO.checkRegister(registerInput.getUsername(), registerInput.getEmail())) {
                User user = User.builder()
                        .username(registerInput.getUsername())
                        .password(registerInput.getPassword())
                        .email(registerInput.getEmail())
                        .name(registerInput.getName())
                        .phone(registerInput.getPhone())
                        .gender(gender).birthday(birthday)
                        .role(RoleType.USER).build();
                userDAO.register(user);
                return Response.ok().build();
            }
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/token")
    @Produces(MediaType.TEXT_PLAIN)
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response refreshToken(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            userDAO.findById(userId).orElseThrow(Exception::new);
            String token = jwtUtils.issueToken(userId);
            return Response.ok(token).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}