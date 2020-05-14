package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.PromotionDAO;
import org.example.input.OrderInput;
import org.example.model.Laptop;
import org.example.model.OrderDetail;
import org.example.model.Promotion;
import org.example.security.Secured;
import org.example.service.api.OrderService;
import org.example.type.ProductType;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.*;
import java.util.stream.Collectors;

@Path("/api/orders")
public class OrderServiceImpl implements OrderService {

    @EJB(mappedName = "LaptopDAOImpl")
    LaptopDAO laptopDAO;

    @EJB(mappedName = "PromotionDAOImpl")
    PromotionDAO promotionDAO;

    @Override
    @POST
    @Path("/")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createOrder(OrderInput orderInput, @Context SecurityContext securityContext) {
        try {
            Map<String, Integer> cartMap = buildCartMapFromRequestBody(orderInput);
            List<OrderDetail> orderLaptops = buildLaptopListFromCart(cartMap);
            List<OrderDetail> orderPromotions = buildOrderPromotionsFromCart(cartMap);
            // To Do: OrderDAO & Order Model to Persist
            System.out.println(orderLaptops);
            System.out.println(orderPromotions);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Map<String, Integer> buildCartMapFromRequestBody(OrderInput orderInput) throws JsonProcessingException {
        ObjectMapper om = new ObjectMapper();
        TypeReference<Map<String, Integer>> typeReference = new TypeReference<Map<String, Integer>>() {};
        return om.readValue(orderInput.getCartJSON(), typeReference);
    }

    private List<OrderDetail> buildLaptopListFromCart(Map<String, Integer> cartMap)  {
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
}