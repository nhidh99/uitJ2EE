package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.AddressDAO;
import org.example.dao.api.OrderDAO;
import org.example.dao.api.UserDAO;
import org.example.input.PasswordInput;
import org.example.input.UserInput;
import org.example.model.*;
import org.example.security.Secured;
import org.example.service.api.UserService;
import org.example.type.GenderType;
import org.example.type.ProductType;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.persistence.NoResultException;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.security.Principal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Path("/api/users")
@Secured({RoleType.USER, RoleType.ADMIN})
public class UserServiceImpl implements UserService {

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @EJB(mappedName = "AddressDAOImpl")
    private AddressDAO addressDAO;

    @EJB(mappedName = "OrderDAOImpl")
    private OrderDAO orderDAO;

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
    public Response updateUser(UserInput userInput, @Context SecurityContext securityContext) {
        try {
            User user = buildUserFromUserInput(userInput, securityContext);
            userDAO.update(user);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private User buildUserFromUserInput(UserInput userInput, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        String id = principal.getName();
        User user = userDAO.findById(Integer.parseInt(id)).orElseThrow(BadRequestException::new);

        GenderType gender = GenderType.valueOf(userInput.getGender());
        LocalDate birthday = Instant.ofEpochMilli(userInput.getBirthday()).atZone(ZoneId.systemDefault()).toLocalDate();

        if (!user.getEmail().equals(userInput.getEmail())) {
            if (userDAO.checkEmailExisted(userInput.getEmail())) {
                user.setEmail(userInput.getEmail());
            } else {
                throw new BadRequestException();
            }
        }

        user.setName(userInput.getName());
        user.setPhone(userInput.getPhone());
        user.setGender(gender);
        user.setBirthday(birthday);
        return user;
    }

    @Override
    @PUT
    @Path("/me/password")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePassword(PasswordInput passwordInput, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        String oldPassword = passwordInput.getOldPassword();
        String newPassword = passwordInput.getNewPassword();

        try {
            return userDAO.updatePassword(userId, oldPassword, newPassword)
                    ? Response.noContent().build()
                    : Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/me/addresses")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserAddresses(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            List<Address> addresses = addressDAO.findByUserId(userId);
            ObjectMapper om = new ObjectMapper();
            String addressesJSON = om.writeValueAsString(addresses);
            return Response.ok(addressesJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Path("/me/orders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findUserOrderOverviews(@QueryParam("page") @DefaultValue("1") Integer page,
                                           @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            List<Order> orders = orderDAO.findByUserId(page, userId);
            Long orderCount = orderDAO.findTotalOrdersByUserId(userId);
            List<OrderOverview> orderOverviews = orders.stream().map(OrderOverview::fromOrder).collect(Collectors.toList());
            ObjectMapper om = new ObjectMapper();
            String orderOverviewsJSON = om.writeValueAsString(orderOverviews);
            return Response.ok(orderOverviewsJSON).header("X-Total-Count", orderCount).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}