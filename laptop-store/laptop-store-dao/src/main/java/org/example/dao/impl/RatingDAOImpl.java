package org.example.dao.impl;

import org.example.dao.api.RatingDAO;
import org.example.model.Laptop;
import org.example.model.Rating;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class RatingDAOImpl implements RatingDAO {

    private static final Integer ELEMENT_PER_ADMIN_BLOCK = 5;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Rating> findById(Integer id) {
        Rating rating = em.find(Rating.class, id);
        return Optional.of(rating);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Rating rating) {
        em.persist(rating);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Rating> findByProductId(Integer laptopId) {
        String query = "SELECT r FROM Rating r " +
                "WHERE r.laptop.id = :laptopId " +
                "AND r.approveStatus = true " +
                "AND (r.commentTitle IS NOT NULL OR r.commentDetail IS NOT NULL)";
        return em.createQuery(query, Rating.class)
                .setParameter("laptopId", laptopId)
                .getResultList();
    }

    @Override
    public List<Rating> findByFilter(String id, String status, Integer page) {
        String query = "SELECT r FROM Rating r " +
                "WHERE (r.id is NULL OR cast(r.id as string) = '' OR cast(r.id as string) LIKE CONCAT('%', :id, '%')) " +
                "AND (r.approveStatus is NULL OR cast(r.approveStatus as string) LIKE CONCAT('%', :status, '%'))";
        return em.createQuery(query, Rating.class)
                .setParameter("id", id)
                .setParameter("status", status)
                .setFirstResult(ELEMENT_PER_ADMIN_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_ADMIN_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalRatingByProductId(Integer laptopId) {
        String query = "SELECT COUNT(r) FROM Rating r " +
                "WHERE r.laptop.id = :laptopId " +
                "AND r.approveStatus = true " +
                "AND (r.commentTitle IS NOT NULL OR r.commentDetail IS NOT NULL)";
        return em.createQuery(query, Long.class)
                .setParameter("laptopId", laptopId)
                .getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalRatingByFilter(String id, String status) {
        if (id == null && status == null) {
            String query = "SELECT COUNT(r) FROM Rating r";
            return em.createQuery(query, Long.class).getSingleResult();
        } else {
            String query = "SELECT Count(r) FROM Rating r " +
                    "WHERE (r.id IS NULL OR cast(r.id as string) = '' OR cast(r.id as string) LIKE CONCAT('%', :id, '%')) " +
                    "AND (r.approveStatus IS NULL OR cast(r.approveStatus as string) LIKE CONCAT('%', :status, '%'))";
            return em.createQuery(query, Long.class)
                    .setParameter("id", id)
                    .setParameter("status", status)
                    .getSingleResult();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Rating> findByPage(Integer page) {
        String query = "SELECT r FROM Rating r ORDER BY r.id DESC";
        return em.createQuery(query, Rating.class)
                .setFirstResult(ELEMENT_PER_ADMIN_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_ADMIN_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Rating rating = em.find(Rating.class, id);
        if (rating == null) throw new BadRequestException();
        em.remove(rating);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void approve(Integer id) {
        Rating rating = em.find(Rating.class, id);
        if (rating == null) throw new BadRequestException();
        rating.setApproveStatus(true);
        em.merge(rating);

        Integer laptopId = rating.getLaptop().getId();
        Laptop laptop = em.find(Laptop.class, laptopId);
        Float avgRating = findAvgRatingByProductId(laptopId);
        laptop.setAvgRating(avgRating);
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void deny(Integer id) {
        Rating rating = em.find(Rating.class, id);
        if (rating == null) throw new BadRequestException();
        rating.setApproveStatus(false);
        em.merge(rating);

        Integer laptopId = rating.getLaptop().getId();
        Laptop laptop = em.find(Laptop.class, laptopId);
        Float avgRating = findAvgRatingByProductId(laptopId);
        laptop.setAvgRating(avgRating);
        em.merge(laptop);
    }

    private Float findAvgRatingByProductId(Integer laptopId) {
        String query = "SELECT AVG(r.rating) FROM Rating r WHERE r.laptop.id = :laptopId AND r.approveStatus = true";
        Double result = em.createQuery(query, Double.class).setParameter("laptopId", laptopId).getSingleResult();
        return result == null ? 5.0f : result.floatValue();
    }
}