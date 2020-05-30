package org.example.service.api;

import org.example.input.OrderInput;
import org.example.input.OrderUpdateInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface OrderService {
    Response createOrder(OrderInput orderInput, SecurityContext securityContext);

    Response findOrderById(Integer orderId, SecurityContext securityContext);

    Response findOrdersByPage(Integer page);

    Response updateOrder(Integer orderId, OrderUpdateInput orderUpdateInput);

    Response cancelOrder(Integer orderId, SecurityContext securityContext);
}
