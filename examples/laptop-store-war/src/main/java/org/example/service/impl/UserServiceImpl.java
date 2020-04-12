package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.example.service.api.UserService;

import javax.ejb.EJB;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/user")
public class UserServiceImpl implements UserService {

    @EJB(mappedName = "UserServiceImpl")
    private UserDAO userDAO;

    @Override
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllUser() {
        List<User> users = userDAO.findAll();
        return Response.ok(users, MediaType.APPLICATION_JSON).build();
    }
}