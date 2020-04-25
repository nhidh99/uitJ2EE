package org.example.dao.impl;

import org.example.dao.api.PromotionDAO;
import org.example.model.Promotion;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@LocalBean
public class PromotionDAOImpl implements PromotionDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    private static final Integer ELEMENT_PER_BLOCK = 20;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByPages(Integer page) {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true";
        return em.createQuery(query, Promotion.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public Promotion save(Promotion promotion) {
        em.merge(promotion);
        return promotion;
    }

    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageByIdAndAlt(Integer id, String alt) {
        String query = "SELECT p.image FROM Promotion p WHERE p.id = :id AND p.alt = :alt";
        try {
            return em.createQuery(query, byte[].class)
                    .setParameter("id", id)
                    .setParameter("alt", alt)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}