package org.example.dao.impl;

import org.example.dao.api.TagDAO;
import org.example.model.Tag;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Stateless
@LocalBean
public class TagDAOImpl implements TagDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findAll() {
        String query = "SELECT t FROM Tag t";
        return em.createQuery(query, Tag.class).getResultList();
    }
}
