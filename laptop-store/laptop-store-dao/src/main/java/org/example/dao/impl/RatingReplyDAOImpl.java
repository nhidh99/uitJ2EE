package org.example.dao.impl;

import org.example.dao.api.RatingReplyDAO;
import org.example.model.RatingReply;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@LocalBean
@Stateless
public class RatingReplyDAOImpl implements RatingReplyDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(RatingReply ratingReply) {
        em.persist(ratingReply);
    }

}
