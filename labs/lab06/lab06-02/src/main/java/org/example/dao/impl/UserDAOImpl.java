package org.example.dao.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Stateless
@LocalBean
public class UserDAOImpl implements UserDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    public List<User> findAll() {
        String query = "SELECT u FROM User u";
        return em.createQuery(query, User.class).getResultList();
    }
}
