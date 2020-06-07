package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.TagDAO;
import org.example.model.Filter;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.model.Tag;
import org.example.type.BrandType;
import org.example.type.CPUType;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.EnumType;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Stateless
@LocalBean
public class LaptopDAOImpl implements LaptopDAO {
    private static final Integer ELEMENT_PER_BLOCK = 8;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @EJB(mappedName = "TagDAOImpl")
    TagDAO tagDAO;

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
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.id DESC";
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
    public List<Laptop> findByCondition(Filter filter) {
        String query = "SELECT l FROM Laptop  l WHERE l.recordStatus = true";

        if(filter.getBrand() != null && !filter.getBrand().equals("")) {
            BrandType []brandTypes = BrandType.values();
            BrandType types = BrandType.MAC;
            for(BrandType brandType: brandTypes) {
                if(brandType.name().contains(filter.getBrand().toUpperCase()))
                    types = brandType;
            }
            query = "SELECT l FROM Laptop l WHERE l.brand IN (:types) AND l.recordStatus = true";
            return em.createQuery(query)
                    .setParameter("types", types)
                    .setFirstResult(ELEMENT_PER_BLOCK * (filter.getPage() - 1))
                    .setMaxResults(ELEMENT_PER_BLOCK)
                    .getResultList();
        }

        if(filter.getCpu()!=null && !filter.getCpu().equals("")) {
            CPUType []cpuTypes = CPUType.values();
            CPUType types = CPUType.INTEL_CORE_I3;
            for(CPUType cpuType: cpuTypes) {
                if(cpuType.name().contains(filter.getCpu().toUpperCase().replace(" ","_")))
                    types = cpuType;
            }
            query = "SELECT l FROM Laptop l INNER JOIN l.cpu cpu ON cpu.id = l.cpu.id " +
                    "WHERE cpu.type IN (:types) AND l.recordStatus = true";
            return em.createQuery(query)
                    .setParameter("types", types)
                    .setFirstResult(ELEMENT_PER_BLOCK * (filter.getPage() - 1))
                    .setMaxResults(ELEMENT_PER_BLOCK)
                    .getResultList();
        }

        if(filter.getHardDrive() != null) {
            query = "SELECT l FROM Laptop l INNER JOIN l.hardDrive hardDrive ON hardDrive.id = l.hardDrive.id " +
                    "WHERE hardDrive.size >= "+filter.getHardDrive()+" AND l.recordStatus = true " +
                    "ORDER BY hardDrive.size ASC";
        }

        if(filter.getMonitor() != null) {
            query = "SELECT l FROM Laptop l INNER JOIN l.monitor monitor ON monitor.id = l.monitor.id " +
                    "WHERE monitor.size >= "+filter.getMonitor()+" AND l.recordStatus = true " +
                    "ORDER BY monitor.size ASC";
        }

        if(filter.getPrice() != null) {
            query = "SELECT l FROM Laptop l WHERE l.unitPrice >= "+filter.getPrice()+" AND l.recordStatus = true " +
                    "ORDER BY l.unitPrice ASC";
        }

        if(filter.getRam() != null) {
            query = "SELECT l FROM Laptop l INNER JOIN l.ram ram " +
                    "WHERE ram.size >= "+filter.getRam()+" AND l.recordStatus = true ORDER BY ram.size ASC";
        }

        if(filter.getDemand() != null && !filter.getDemand().equals("")) {
            query = "SELECT l FROM Laptop l INNER JOIN l.tags t WHERE t.name = '"+filter.getDemand()+"'";
        }

        if(filter.getName() !=null && !filter.getName().equals("")) {
            query = "SELECT l FROM Laptop l WHERE l.name LIKE concat('%','"+filter.getName()+"','%')";
        }

        return em.createQuery(query)
                .setFirstResult(ELEMENT_PER_BLOCK * (filter.getPage() - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalLaptops() {
        String query = "SELECT COUNT(l) FROM Laptop l WHERE  l.recordStatus = true";
        return em.createQuery(query, Long.class).getSingleResult();
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Laptop> findByType(String type, Integer page) {
        String query = "";
        switch (type) {
            case "new": {
                query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.id DESC";
                break;
            }
            case "cheap": {
                query = "SELECT l FROM Laptop l WHERE l.recordStatus = true ORDER BY l.unitPrice ASC";
                break;
            }
            case "top-selling": {
                query = "SELECT l FROM Laptop l JOIN OrderDetail od ON l.id = od.productId " +
                        "WHERE l.recordStatus = true GROUP BY l.id ORDER BY COUNT(od.productId) DESC";
                break;
            }
            case "common":
            default:
                query = "SELECT l FROM Laptop l WHERE l.recordStatus = true";
        }
        return em.createQuery(query, Laptop.class)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
                .getResultList();
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
    public List<Laptop> findByName(String name, Integer page) {
        String query = "SELECT l FROM Laptop l WHERE l.recordStatus = true AND l.name LIKE CONCAT('%',?1,'%')";
        return em.createQuery(query, Laptop.class)
                .setParameter(1, name)
                .setFirstResult(ELEMENT_PER_BLOCK * (page - 1))
                .setMaxResults(ELEMENT_PER_BLOCK)
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
