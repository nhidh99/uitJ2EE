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
import java.util.Optional;

@Stateless
@LocalBean
public class PromotionDAOImpl implements PromotionDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    private static final Integer ELEMENT_PER_BLOCK = 20;

//    @Override
//    @Transactional(Transactional.TxType.SUPPORTS)
//    public List<Promotion> findByPages(Integer page) {
//        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true";
//        return em.createQuery(query, Promotion.class)
//                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
//                .setMaxResults(ELEMENT_PER_BLOCK)
//                .getResultList();
//    }


    @Override
    public List<Promotion> findAll() {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true";
        return em.createQuery(query, Promotion.class).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Promotion promotion) {
        if (promotion.getImage() == null && promotion.isRecordStatus()) {
            Promotion oldPromotion = em.find(Promotion.class, promotion.getId());
            promotion.setImage(oldPromotion.getImage());
        }
        em.merge(promotion);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Promotion> findById(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        return Optional.ofNullable(promotion);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id) {
        String query = "SELECT p.image FROM Promotion p WHERE p.id = :id and p.recordStatus = true";
        try {
            return em.createQuery(query, byte[].class)
                    .setParameter("id", id)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}