package org.example.service.api;

import org.example.input.AddressInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface AddressService {
    Response createAddress(AddressInput addressInput, SecurityContext securityContext);

    Response updateAddress(Integer id, AddressInput addressInput, SecurityContext securityContext);

    Response deleteAddress(Integer id);

    Response findAddressById(Integer id, SecurityContext securityContext);
}
