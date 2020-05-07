package org.example.service.impl;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.example.dao.api.UserDAO;
import org.example.input.RegisterInput;
import org.example.model.User;
import org.example.service.api.AuthService;
import org.example.type.Role;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.Date;

@Path("/api/auth")
public class AuthServiceImpl implements AuthService {
    final Long JWT_EXPIRATION_TIME = 600000L;
    final String JWT_SECRET = "mykey";

    @Inject
    private UserDAO userDAO;

    @Context
    SecurityContext securityContext;

    String issueToken(Integer id) {
        String jwtToken = Jwts.builder()
                .setSubject(id.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
        return jwtToken;
    }

    @Override
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response login(@FormParam("username") String username,
                          @FormParam("password") String password) {
        try {
            System.out.println(username);
            if (userDAO.login(username, password)) {
                User user = userDAO.findByUsername(username);
                Integer id = user.getId();
                String token = issueToken(id);

                return Response.ok(token).build();
            }
            return Response.status(Response.Status.UNAUTHORIZED).build();

        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }

    @Override
    @POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response register(@BeanParam RegisterInput registerInput) {
        //Todo: Check username existed or not
        try {
            if(userDAO.checkRegister(registerInput.getUsername(), registerInput.getEmail()))
            {
                User user = User.builder()
                        .username(registerInput.getUsername())
                        .password(registerInput.getPassword())
                        .email(registerInput.getEmail())
                        .name(registerInput.getName())
                        .phone(registerInput.getPhone())
                        .role(Role.ROLE_USER).build();
                userDAO.register(user);
                return Response.ok().build();
            }
            else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

//    private User buildUserFromRequestBody(MultipartBody body) {
//        String username = body.getAttachmentObject("username", String.class);
//        String password = body.getAttachmentObject("password", String.class);
//        String email = body.getAttachmentObject("email", String.class);
//        String name = body.getAttachmentObject("name", String.class);
//        Role role = Role.ROLE_USER;
//        return User.builder().username(username).password(password).email(email).name(name).role(role).build();
//    }
}
