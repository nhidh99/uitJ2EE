package org.example.dao.impl;

import org.example.dao.api.UserDAO;
import org.example.model.Laptop;
import org.example.model.User;
import org.example.type.Role;
import org.mindrot.jbcrypt.BCrypt;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.util.Optional;

@Stateless
@LocalBean
public class UserDAOImpl implements UserDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    private static final int workload = 12;

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        User user = em.find(User.class, id);
        if (user == null) throw new BadRequestException();
        em.remove(user);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public boolean login(String username, String password) {
        User user = findByUsername(username);
        String storedPassword = user.getPassword();
        return checkPassword(password, storedPassword);
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void register(User user) {
        String hashedPassword = hashPassword(user.getPassword());
        user.setPassword(hashedPassword);
        em.persist(user);
    }

    @Override
    public User findByUsername(String username) {
        String query = "SELECT u FROM User u WHERE u.username = :username";
        return em.createQuery(query, User.class).setParameter("username", username).getResultList().isEmpty() ?
               null : em.createQuery(query, User.class).setParameter("username", username).getSingleResult();
    }

    @Override
    public Optional<User> findById(Integer id) {
        User user = em.find(User.class, id);
        return Optional.of(user);
    }

    public String hashPassword(String plainPassword) {
        String salt = BCrypt.gensalt(workload);
        return BCrypt.hashpw(plainPassword, salt);
    }

    public boolean checkPassword(String plainPassword, String hashedPassword) {
        if (null == hashedPassword || !hashedPassword.startsWith("$2a$")) {
            throw new java.lang.IllegalArgumentException("Invalid hash provided for comparison");
        }
        return BCrypt.checkpw(plainPassword, hashedPassword);
    }

    public boolean checkUsername(String username) {
        return findByUsername(username) != null ? false : true;
    }
}
