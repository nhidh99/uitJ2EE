package org.example.dao.impl;

import org.example.dao.api.PromotionDAO;
import org.example.model.Promotion;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
@LocalBean
public class PromotionDAOImpl implements PromotionDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    private static final Integer ELEMENT_PER_BLOCK = 20;

    @Override
    public List<Promotion> findByPages(Integer page) {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true";
        return em.createQuery(query, Promotion.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }
}