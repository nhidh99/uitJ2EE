package org.example.dao.impl;

import org.example.dao.api.AddressDAO;
import org.example.model.Address;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@LocalBean
public class AddressDAOImpl implements AddressDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Address> findByUserId(Integer userId) {
        String query = "SELECT a FROM Address a WHERE a.recordStatus = true and a.user.id = :userId";
        return em.createQuery(query, Address.class).setParameter("userId", userId).getResultList();
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Address address) {
        if(address.getId() == null) {
            insert(address);
        } else {
            update(address);
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void insert(Address address) {
        em.persist(address);
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void update(Address address) {
        em.merge(address);
    }

}
