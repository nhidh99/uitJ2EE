package org.example.dao.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class UserDAOImpl implements UserDAO {

    @PersistenceContext(name = "user-store")
    private EntityManager em;

    public List<User> findAll() {
        String query = "SELECT u FROM User u";
        return em.createQuery(query, User.class).getResultList();
    }

    public Optional<User> findById(String id) {
        User user = em.find(User.class, id);
        return Optional.ofNullable(user);
    }
}