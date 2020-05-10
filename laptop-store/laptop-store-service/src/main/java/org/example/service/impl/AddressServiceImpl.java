package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.AddressDAO;
import org.example.dao.api.UserDAO;
import org.example.input.AddressInput;
import org.example.model.Address;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.AddressService;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.util.List;

@Path("/api/addresses")
@Secured({RoleType.ADMIN, RoleType.USER})
public class AddressServiceImpl implements AddressService {

    @EJB(mappedName = "AddressDAOImpl")
    private AddressDAO addressDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Override
    @GET
    @Path("/me")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAddressByUser(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            String id = principal.getName();
            List<Address> addressList = addressDAO.findByUserId(Integer.parseInt(id));
            ObjectMapper om = new ObjectMapper();
            String addressListJSON = om.writeValueAsString(addressList);
            return Response.ok(addressListJSON).build();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createAddress(@Context SecurityContext securityContext, AddressInput addressInput) {
        try {
            Address address = buildAddressFromRequestBody(securityContext, addressInput);
            addressDAO.save(address);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateAddress(@PathParam("id") Integer id, @Context SecurityContext securityContext,AddressInput addressInput) {
        try {
            Address address = buildAddressFromRequestBody(securityContext, addressInput);
            address.setId(id);
            addressDAO.save(address);
            return Response.ok().build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private Address buildAddressFromRequestBody(@Context SecurityContext securityContext, AddressInput addressInput) {
        Principal principal = securityContext.getUserPrincipal();
        String userId = principal.getName();
        User user = userDAO.findById(Integer.parseInt(userId)).orElseThrow(BadRequestException::new);
        return Address.builder()
                .receiverName(addressInput.getReceiverName())
                .phone(addressInput.getPhone())
                .addressNum(addressInput.getAddressNum())
                .street(addressInput.getStreet())
                .ward(addressInput.getWard())
                .district(addressInput.getDistrict())
                .city(addressInput.getCity())
                .user(user).recordStatus(true).build();
    }
}
