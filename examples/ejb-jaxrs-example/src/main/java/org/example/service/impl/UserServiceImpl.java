package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.example.model.UserInput;
import org.example.service.api.UserService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/users")
public class UserServiceImpl implements UserService {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllUser()  {
        try {
            List<User> users = userDAO.findAll();
            return Response.ok(users).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GET
    @Path("/demo")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUser(@BeanParam UserInput userInput) {
        String username = userInput.getUsername();
        String password = userInput.getPassword();
        User user = new User(username, password);
        return Response.ok(user).build();
    }
}