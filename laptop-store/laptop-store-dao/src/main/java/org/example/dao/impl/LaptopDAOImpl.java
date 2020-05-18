package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
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
    public Long findTotalLaptops() {
        String query = "SELECT COUNT(l) FROM Laptop l WHERE l.recordStatus = true";
        return em.createQuery(query, Long.class).getSingleResult();
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
