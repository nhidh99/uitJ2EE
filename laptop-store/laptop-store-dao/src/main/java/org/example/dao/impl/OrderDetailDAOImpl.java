package org.example.dao.impl;

import org.example.dao.api.OrderDetailDAO;
import org.example.model.OrderDetail;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@LocalBean
public class OrderDetailDAOImpl implements OrderDetailDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<OrderDetail> findByOrderId(Integer orderId) {
        String query = "SELECT d FROM OrderDetail d WHERE d.order.id = :orderId";
        return em.createQuery(query, OrderDetail.class)
                .setParameter("orderId", orderId)
                .getResultList();
    }
}
