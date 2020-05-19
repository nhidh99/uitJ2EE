package org.example.dao.impl;

import org.example.dao.api.OrderDAO;
import org.example.model.Order;
import org.example.model.OrderDetail;
import org.example.model.OrderOverview;
import org.example.type.ProductType;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Stateless
@LocalBean
public class OrderDAOImpl implements OrderDAO {

    private static final Integer ELEMENT_PER_BLOCK = 5;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Order order) {
        if (order.getId() == null) {
            insert(order);
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
    private void update(Order order) {
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<OrderOverview> findOverviewsByUserId(Integer page, Integer userId) {
        String query = "SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.id DESC";
        List<Order> orders = em.createQuery(query, Order.class).setParameter("userId", userId)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();

        List<OrderOverview> orderOverviews = new LinkedList<>();
        for (Order order : orders) {
            List<OrderDetail> orderProducts = order.getOrderDetails().stream()
                    .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                    .collect(Collectors.toList());
            Integer productCount = orderProducts.stream().mapToInt(OrderDetail::getQuantity).sum();
            OrderOverview orderOverview = OrderOverview.builder()
                    .order(order).firstProduct(orderProducts.get(0))
                    .productCount(productCount).build();
            orderOverviews.add(orderOverview);
        }
        return orderOverviews;
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalOrdersByUserId(Integer userId) {
        String query = "SELECT COUNT(o) FROM Order o WHERE o.user.id = :userId";
        return em.createQuery(query, Long.class).setParameter("userId", userId).getSingleResult();
    }
}
