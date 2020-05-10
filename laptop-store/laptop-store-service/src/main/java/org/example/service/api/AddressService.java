package org.example.service.api;

import org.example.input.AddressInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface AddressService {
    Response findAddressByUser(SecurityContext securityContext);
    Response createAddress(SecurityContext securityContext, AddressInput addressInput);
    Response updateAddress(Integer id, SecurityContext securityContext, AddressInput addressInput);
}
