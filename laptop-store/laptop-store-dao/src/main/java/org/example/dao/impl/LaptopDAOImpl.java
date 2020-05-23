package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.model.Laptop;

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
public class LaptopDAOImpl implements LaptopDAO {
    private static final Integer ELEMENT_PER_BLOCK = 5;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Laptop laptop) {
        if (laptop.getId() == null) {
            insert(laptop);
        } else {
            update(laptop);
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void insert(Laptop laptop) {
        laptop.setAvgRating(5.0f);
        em.merge(laptop);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void update(Laptop laptop) {
        Laptop oldLaptop = findById(laptop.getId()).orElseThrow(BadRequestException::new);
        if (laptop.getImage() == null) {
            laptop.setImage(oldLaptop.getImage());
            laptop.setThumbnail(oldLaptop.getThumbnail());
        }
        laptop.setAvgRating(oldLaptop.getAvgRating());
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByPage(Integer page) {
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true";
        return em.createQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Laptop laptop = em.find(Laptop.class, id);
        if (laptop == null) throw new BadRequestException();
        laptop.setRecordStatus(false);
        em.merge(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Laptop> findById(Integer id) {
        Laptop laptop = em.find(Laptop.class, id);
        return Optional.of(laptop);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByFilter(String filter, Integer page) {
        if (filter.matches("[0-9]+")) {
            String query = "SELECT l FROM Laptop l WHERE l.id = :id OR l.name LIKE CONCAT('%',:name,'%') AND l.recordStatus = true";
            return em.createQuery(query, Laptop.class)
                    .setParameter("id", Integer.parseInt(filter))
                    .setParameter("name", filter)
                    .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                    .setMaxResults(ELEMENT_PER_BLOCK)
                    .getResultList();
        } else {
            String query = "SELECT l FROM Laptop l WHERE l.name LIKE CONCAT('%',:name,'%') AND l.recordStatus = true";
            return em.createQuery(query, Laptop.class)
                    .setParameter("name", filter)
                    .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                    .setMaxResults(ELEMENT_PER_BLOCK)
                    .getResultList();
        }

    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalLaptops(String filter) {
        if(filter == null) {
            String query = "SELECT COUNT(l) FROM Laptop l WHERE l.recordStatus = true";
            return em.createQuery(query, Long.class).getSingleResult();
        } else {
            if(filter.matches("[0-9]+")) {
                String query = "SELECT COUNT(l) FROM Laptop l WHERE l.id = :id OR l.name LIKE CONCAT('%',:name,'%') AND l.recordStatus = true";
                return em.createQuery(query, Long.class)
                        .setParameter("id", Integer.parseInt(filter))
                        .setParameter("name", filter)
                        .getSingleResult();
            } else {
                String query = "SELECT COUNT(l) FROM Laptop l WHERE l.name LIKE CONCAT('%',:name,'%') AND l.recordStatus = true";
                return em.createQuery(query, Long.class)
                        .setParameter("name", filter)
                        .getSingleResult();
            }
        }
    }


    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByIds(List<Integer> ids) {
        if (ids.isEmpty()) return new ArrayList<>();
        String query = "SELECT l FROM Laptop l WHERE l.id IN :ids AND l.recordStatus = true";
        return em.createQuery(query, Laptop.class)
                .setParameter("ids", ids)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id) {
        Laptop laptop = em.find(Laptop.class, id);
        if (laptop == null) return null;
        return laptop.getImage();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findThumbnailById(Integer id) {
        Laptop laptop = em.find(Laptop.class, id);
        if (laptop == null) return null;
        return laptop.getThumbnail();
    }
}
