package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.example.dao.api.*;
import org.example.input.OrderInput;
import org.example.input.OrderUpdateInput;
import org.example.model.*;
import org.example.security.Secured;
import org.example.service.api.OrderService;
import org.example.type.OrderStatus;
import org.example.type.ProductType;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.sql.SQLException;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Path("/api/orders")
public class OrderServiceImpl implements OrderService {

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @EJB(mappedName = "AddressDAOImpl")
    private AddressDAO addressDAO;

    @EJB(mappedName = "OrderDAOImpl")
    private OrderDAO orderDAO;

    @EJB(mappedName = "OrderDetailDAOImpl")
    private OrderDetailDAO orderDetailDAO;

    private static final Integer TRANSPORT_FEE = 45_000;
    private static final Integer NUMBER_OF_DELIVERY_DAYS = 3;

    @Override
    @POST
    @Path("/")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response createOrder(OrderInput orderInput, @Context SecurityContext securityContext) {
        try {
            Order order = buildOrderFromRequestBody(orderInput, securityContext);
            orderDAO.save(order);
            return Response.ok(order.getId()).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Order buildOrderFromRequestBody(OrderInput orderInput, SecurityContext securityContext) throws JsonProcessingException {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);

        Address address = addressDAO.findById(orderInput.getAddressId()).orElseThrow(BadRequestException::new);
        Map<String, Integer> cartMap = buildCartMapFromRequestBody(orderInput.getCartJSON());
        List<OrderDetail> orderDetails = buildOrderDetailsFromCart(cartMap);
        LocalDate deliveryDate = buildDeliveryDate();
        Long totalPrice = TRANSPORT_FEE + orderDetails.stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .mapToLong(OrderDetail::getTotalPrice).sum();

        return Order.builder()
                .addressNum(address.getAddressNum()).street(address.getStreet())
                .ward(address.getWard()).district(address.getDistrict())
                .city(address.getCity()).receiverName(address.getReceiverName())
                .receiverPhone(address.getReceiverPhone()).transportFee(TRANSPORT_FEE)
                .totalPrice(totalPrice).orderDetails(orderDetails).status(OrderStatus.PENDING)
                .orderDate(LocalDate.now()).deliveryDate(deliveryDate).user(user).build();
    }

    private Map<String, Integer> buildCartMapFromRequestBody(String cartJSON) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        TypeReference<Map<String, Integer>> typeReference = new TypeReference<Map<String, Integer>>() {
        };
        return om.readValue(cartJSON, typeReference);
    }

    private List<OrderDetail> buildOrderDetailsFromCart(Map<String, Integer> cartMap) {
        List<OrderDetail> orderLaptops = buildOrderLaptopsFromCart(cartMap);
        List<OrderDetail> orderPromotions = buildOrderPromotionsFromCart(cartMap);
        List<OrderDetail> orderDetails = new ArrayList<>();
        orderDetails.addAll(orderLaptops);
        orderDetails.addAll(orderPromotions);
        return orderDetails;
    }

    private List<OrderDetail> buildOrderLaptopsFromCart(Map<String, Integer> cartMap) {
        List<Integer> laptopIds = cartMap.keySet().stream().map(Integer::parseInt).collect(Collectors.toList());
        return laptopDAO.findByIds(laptopIds).stream().map(laptop -> {
            Integer quantity = cartMap.get(laptop.getId().toString());
            Long unitPrice = laptop.getUnitPrice() - laptop.getDiscountPrice();
            Long totalPrice = quantity * unitPrice;
            return OrderDetail.builder()
                    .productId(laptop.getId()).productName(laptop.getName())
                    .productType(ProductType.LAPTOP).quantity(quantity)
                    .unitPrice(unitPrice).totalPrice(totalPrice).build();
        }).collect(Collectors.toList());
    }

    private List<OrderDetail> buildOrderPromotionsFromCart(Map<String, Integer> cartMap) {
        Map<Integer, Integer> promotionMap = new HashMap<>();
        cartMap.keySet().forEach(key -> {
            Integer laptopId = Integer.parseInt(key);
            List<Promotion> promotions = promotionDAO.findByLaptopId(laptopId);
            promotions.forEach(promotion -> {
                Integer promotionId = promotion.getId();
                Integer quantity = cartMap.get(key) + (promotionMap.getOrDefault(promotionId, 0));
                promotionMap.put(promotionId, quantity);
            });
        });

        List<Integer> promotionIds = new ArrayList<>(promotionMap.keySet());
        List<Promotion> promotions = promotionDAO.findByIds(promotionIds);
        return promotions.stream().map(promotion -> {
            Integer quantity = promotionMap.get(promotion.getId());
            Long totalPrice = quantity * promotion.getPrice();
            return OrderDetail.builder()
                    .productId(promotion.getId()).productName(promotion.getName())
                    .productType(ProductType.PROMOTION).unitPrice(promotion.getPrice())
                    .quantity(quantity).totalPrice(totalPrice).build();
        }).collect(Collectors.toList());
    }

    private LocalDate buildDeliveryDate() {
        LocalDate result = LocalDate.now();
        int addedDays = 0;
        while (addedDays < NUMBER_OF_DELIVERY_DAYS) {
            result = result.plusDays(1);
            boolean isWeekendDay = result.getDayOfWeek() == DayOfWeek.SATURDAY || result.getDayOfWeek() == DayOfWeek.SUNDAY;
            if (!isWeekendDay) {
                ++addedDays;
            }
        }
        return result;
    }

    @Override
    @GET
    @Path("/{id}")
    @Secured({RoleType.USER, RoleType.ADMIN})
    @Produces(MediaType.APPLICATION_JSON)
    public Response findOrderById(@PathParam("id") Integer orderId,
                                  @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            Order order = orderDAO.findById(orderId).orElseThrow(NotFoundException::new);
            RoleType role = order.getUser().getRole();

            boolean isValidUser = role == RoleType.ADMIN || (role == RoleType.USER && order.getUser().getId().equals(userId));
            if (isValidUser) {
                String orderJSON = buildOrderJSON(order);
                return Response.ok(orderJSON).build();
            }
            return Response.status(Response.Status.FORBIDDEN).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private String buildOrderJSON(Order order) throws JsonProcessingException {
        List<OrderDetail> orderDetails = orderDetailDAO.findByOrderId(order.getId());
        ObjectMapper om = new ObjectMapper();
        String orderJSON = om.writeValueAsString(order);
        String detailsJSON = om.writeValueAsString(orderDetails);
        JsonNode orderNode = om.readTree(orderJSON);
        JsonNode detailsNode = om.readTree(detailsJSON);
        ((ObjectNode) orderNode).set("details", detailsNode);
        return orderNode.toString();
    }

    @Override
    @GET
    @Path("/")
    @Secured(RoleType.ADMIN)
    @Produces(MediaType.APPLICATION_JSON)
    public Response findOrdersByPage(@QueryParam("page") @DefaultValue("1") Integer page) {
        try {
            List<Order> orders = orderDAO.findByPages(page);
            List<OrderOverview> orderOverviews = orders.stream().map(OrderOverview::fromOrder).collect(Collectors.toList());
            Long orderCount = orderDAO.findTotalOrder();
            ObjectMapper om = new ObjectMapper();
            String overviewsJSON = om.writeValueAsString(orderOverviews);
            return Response.ok(overviewsJSON).header("X-Total-Count", orderCount).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured(RoleType.ADMIN)
    public Response updateOrder(@PathParam("id") Integer orderId, OrderUpdateInput status) {
        try {
            OrderStatus orderStatus = OrderStatus.valueOf(status.getStatus());
            orderDAO.updateStatus(orderId, orderStatus);
            return Response.noContent().build();
        } catch (SQLException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}/cancel")
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response cancelOrder(@PathParam("id") Integer orderId, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            Order order = orderDAO.findById(orderId).orElseThrow(BadRequestException::new);
            boolean isValidRequest = order.getUser().getId().equals(userId) && order.getStatus().isBeforePackaged();
            if (isValidRequest) {
                orderDAO.updateStatus(orderId, OrderStatus.CANCELED);
                return Response.noContent().build();
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (SQLException | BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}