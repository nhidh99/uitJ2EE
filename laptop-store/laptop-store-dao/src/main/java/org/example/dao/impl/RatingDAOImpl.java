package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.RatingDAO;
import org.example.model.Laptop;
import org.example.model.Rating;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@LocalBean
public class RatingDAOImpl implements RatingDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Rating rating) {
        em.persist(rating);
        Integer laptopId = rating.getLaptop().getId();
        Laptop laptop = em.find(Laptop.class, laptopId);
        Float avgRating = findAvgRatingByProductId(laptopId);
        laptop.setAvgRating(avgRating);
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Rating> findByProductId(Integer userId, Integer laptopId) {
        String query = "SELECT r FROM Rating r WHERE r.user.id = :userId AND r.laptop.id = :laptopId";
        return em.createQuery(query, Rating.class)
                .setParameter("userId", userId)
                .setParameter("laptopId", laptopId)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Float findAvgRatingByProductId(Integer laptopId) {
        String query = "SELECT AVG(r.rating) FROM Rating r WHERE r.laptop.id = :laptopId";
        return em.createQuery(query, Double.class)
                .setParameter("laptopId", laptopId)
                .getSingleResult()
                .floatValue();
    }

}
