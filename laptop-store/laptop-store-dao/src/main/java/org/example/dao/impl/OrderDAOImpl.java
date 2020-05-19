package org.example.dao.impl;

import org.example.dao.api.OrderDAO;
import org.example.model.Order;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Stateless
@LocalBean
public class OrderDAOImpl implements OrderDAO {

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

    private void insert(Order order) {
        order.getOrderDetails().forEach(detail -> detail.setOrder(order));
        em.persist(order);
    }

    private void update(Order order) {
    }
}
