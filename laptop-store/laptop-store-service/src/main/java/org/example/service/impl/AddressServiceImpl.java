package org.example.service.impl;

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
    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createAddress(AddressInput addressInput, @Context SecurityContext securityContext) {
        try {
            Address address = buildAddressFromRequestBody(addressInput, securityContext);
            addressDAO.save(address);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateAddress(@PathParam("id") Integer id, AddressInput addressInput, @Context SecurityContext securityContext) {
        try {
            Address address = buildAddressFromRequestBody(addressInput, securityContext);
            address.setId(id);
            addressDAO.save(address);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Address buildAddressFromRequestBody(AddressInput addressInput, @Context SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        return Address.builder()
                .receiverName(addressInput.getReceiverName())
                .receiverPhone(addressInput.getReceiverPhone())
                .addressNum(addressInput.getAddressNum())
                .street(addressInput.getStreet())
                .ward(addressInput.getWard())
                .district(addressInput.getDistrict())
                .city(addressInput.getCity())
                .user(user).recordStatus(true).build();
    }

    @Override
    @DELETE
    @Path("/{id}")
    public Response deleteAddress(@PathParam("id") Integer id) {
        try {
            addressDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
