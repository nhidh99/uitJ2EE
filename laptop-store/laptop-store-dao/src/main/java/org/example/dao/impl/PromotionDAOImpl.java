package org.example.dao.impl;

import org.example.dao.api.PromotionDAO;
import org.example.model.Laptop;
import org.example.model.Promotion;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class PromotionDAOImpl implements PromotionDAO {
    private static final Integer ELEMENT_PER_BLOCK = 5;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findAll() {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true ORDER BY p.id DESC";
        return em.createQuery(query, Promotion.class).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByPage(Integer page) {
        String query = "SELECT p FROM Promotion p WHERE p.recordStatus = true ORDER BY p.id DESC";
        return em.createQuery(query, Promotion.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByIds(List<Integer> ids) {
        if (ids.isEmpty()) return new ArrayList<>();
        String query = "SELECT p FROM Promotion p WHERE p.id IN :ids AND p.recordStatus = true";
        return em.createQuery(query, Promotion.class)
                .setParameter("ids", ids)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalPromotions() {
        String query = "SELECT COUNT(p) FROM Promotion p WHERE p.recordStatus = true";
        return em.createQuery(query, Long.class).getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Promotion promotion) {
        if (promotion.getId() == null) {
            insert(promotion);
        } else {
            update(promotion);
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void insert(Promotion promotion) {
        em.persist(promotion);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void update(Promotion promotion) {
        Promotion oldPromotion = findById(promotion.getId()).orElseThrow(BadRequestException::new);
        promotion.setImage(Optional.ofNullable(promotion.getImage()).orElse(oldPromotion.getImage()));
        promotion.setLaptops(oldPromotion.getLaptops());
        em.merge(promotion);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        if (promotion == null) throw new BadRequestException();
        promotion.setRecordStatus(false);
        promotion.setLaptops(null);
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
    public List<Promotion> findByLaptopId(Integer laptopId) {
        Laptop laptop = em.find(Laptop.class, laptopId);
        if (laptop == null || !laptop.isRecordStatus()) return null;
        return laptop.getPromotions();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        if (promotion == null) return null;
        return promotion.getImage();
    }
}