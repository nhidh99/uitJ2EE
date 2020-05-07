package org.example.dao.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.mindrot.jbcrypt.BCrypt;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class UserDAOImpl implements UserDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    private static final int WORKLOAD = 12;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public boolean login(String username, String plainPassword) {
        Optional<User> optUser = findByUsername(username);
        if (optUser.isPresent()) {
            String hashedPassword = optUser.get().getPassword();
            return BCrypt.checkpw(plainPassword, hashedPassword);
        }
        return false;
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void register(User user) {
        String salt = BCrypt.gensalt(WORKLOAD);
        String plainPassword = user.getPassword();
        String hashedPassword = BCrypt.hashpw(plainPassword, salt);
        user.setPassword(hashedPassword);
        em.persist(user);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> findByUsername(String username) {
        String query = "SELECT u FROM User u WHERE u.username = :username";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("username", username)
                .setMaxResults(1).getResultList();
        return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> findById(Integer id) {
        User user = em.find(User.class, id);
        return Optional.of(user);
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean checkRegister(String username, String email) {
        String query = "SELECT u FROM User u WHERE u.email = :email OR u.username = :username";
        List<User> users = em.createQuery(query, User.class)
                .setParameter("email", email)
                .setParameter("username", username)
                .setMaxResults(1).getResultList();
        return users.isEmpty();
    }
}