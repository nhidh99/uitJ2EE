package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.OrderDAO;
import org.example.dao.api.PromotionDAO;
import org.example.model.*;
import org.example.type.OrderStatus;
import org.example.type.ProductType;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless
@LocalBean
public class OrderDAOImpl implements OrderDAO {

    private static final Integer ELEMENT_PER_BLOCK = 5;

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Order order) {
        if (order.getId() == null) {
            insert(order);
            clearUserCart(order.getUser().getId());
        } else {
            update(order);
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void insert(Order order) {
        order.getOrderDetails().forEach(detail -> detail.setOrder(order));
        em.persist(order);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void clearUserCart(Integer userId) {
        User user = em.find(User.class, userId);
        user.setCart("{}");
        em.merge(user);
    }


    @Transactional(Transactional.TxType.REQUIRED)
    private void update(Order order) {
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Order> findById(Integer id) {
        Order order = em.find(Order.class, id);
        return Optional.ofNullable(order);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Order> findByUserId(Integer page, Integer userId) {
        String query = "SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.id DESC";
        return em.createQuery(query, Order.class).setParameter("userId", userId)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalOrder() {
        String query = "SELECT COUNT(o) FROM Order o";
        return em.createQuery(query, Long.class).getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Order> findByPages(Integer page) {
        String query = "SELECT o FROM Order o ORDER BY o.id DESC";
        return em.createQuery(query, Order.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalOrdersByUserId(Integer userId) {
        String query = "SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void updateStatus(Integer orderId, OrderStatus orderStatus) throws SQLException {
        Order order = em.find(Order.class, orderId);
        if (order.getStatus().isBeforePackaged() && orderStatus.isPackaged()) {
            updateDeliveredProductQuantitiesByOrder(order);
        }
        if (order.getStatus().isPackaged() && orderStatus.isCanceled()) {
            updateRestockedProductQuantitiesByOrder(order);
        }
        order.setStatus(orderStatus);
        em.merge(order);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void updateDeliveredProductQuantitiesByOrder(Order order) throws SQLException {
        List<OrderDetail> laptops = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .collect(Collectors.toList());
        List<OrderDetail> promotions = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.PROMOTION)
                .collect(Collectors.toList());
        updateDeliveredLaptopQuantities(laptops);
        updateDeliveredPromotionQuantities(promotions);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void updateDeliveredLaptopQuantities(List<OrderDetail> orderedLaptops) throws SQLException {
        List<Integer> laptopIds = orderedLaptops.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Laptop> laptops = laptopDAO.findByIds(laptopIds);
        if (laptops.size() != orderedLaptops.size()) {
            throw new SQLException();
        }

        for (Laptop laptop : laptops) {
            OrderDetail orderedLaptop = orderedLaptops.stream()
                    .filter(l -> l.getProductId().equals(laptop.getId()))
                    .findFirst().orElseThrow(SQLException::new);
            int remainQuantity = laptop.getQuantity() - orderedLaptop.getQuantity();
            if (remainQuantity >= 0) {
                laptop.setQuantity(remainQuantity);
            } else {
                throw new SQLException();
            }
        }
        laptops.forEach(laptop -> em.merge(laptop));
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void updateDeliveredPromotionQuantities(List<OrderDetail> orderedPromotions) throws SQLException {
        List<Integer> promotionIds = orderedPromotions.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Promotion> promotions = promotionDAO.findByIds(promotionIds);
        if (promotions.size() != promotionIds.size()) {
            throw new SQLException();
        }

        for (Promotion promotion : promotions) {
            OrderDetail orderedLaptop = orderedPromotions.stream()
                    .filter(p -> p.getProductId().equals(promotion.getId()))
                    .findFirst().orElseThrow(SQLException::new);
            int remainQuantity = promotion.getQuantity() - orderedLaptop.getQuantity();
            if (remainQuantity >= 0) {
                promotion.setQuantity(remainQuantity);
            } else {
                throw new SQLException();
            }
        }
        promotions.forEach(promotion -> em.merge(promotion));
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void updateRestockedProductQuantitiesByOrder(Order order) {
        List<OrderDetail> laptops = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .collect(Collectors.toList());
        List<OrderDetail> promotions = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.PROMOTION)
                .collect(Collectors.toList());
        updateRestockedLaptopQuantities(laptops);
        updateRestockedPromotionQuantities(promotions);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void updateRestockedLaptopQuantities(List<OrderDetail> orderedLaptops) {
        List<Integer> laptopIds = orderedLaptops.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Laptop> laptops = laptopDAO.findByIds(laptopIds);
        laptops.forEach(laptop -> {
            OrderDetail orderedLaptop = orderedLaptops.stream()
                    .filter(l -> l.getProductId().equals(laptop.getId()))
                    .findFirst().orElseThrow(BadRequestException::new);
            int remainQuantity = laptop.getQuantity() + orderedLaptop.getQuantity();
            laptop.setQuantity(remainQuantity);
        });
        laptops.forEach(laptop -> em.merge(laptop));
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void updateRestockedPromotionQuantities(List<OrderDetail> orderedPromotions) {
        List<Integer> promotionIds = orderedPromotions.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Promotion> promotions = promotionDAO.findByIds(promotionIds);
        promotions.forEach(promotion -> {
            OrderDetail orderedLaptop = orderedPromotions.stream()
                    .filter(p -> p.getProductId().equals(promotion.getId()))
                    .findFirst().orElseThrow(BadRequestException::new);
            int remainQuantity = promotion.getQuantity() + orderedLaptop.getQuantity();
            promotion.setQuantity(remainQuantity);
        });
        promotions.forEach(promotion -> em.merge(promotion));
    }
}