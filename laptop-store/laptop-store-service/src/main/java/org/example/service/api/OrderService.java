package org.example.service.api;

import org.example.input.OrderInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface OrderService {
    Response createOrder(OrderInput orderInput, SecurityContext securityContext);

    Response findOrderById(Integer orderId, SecurityContext securityContext);
}
