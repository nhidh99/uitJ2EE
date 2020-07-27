package org.example.dao.impl;

import org.example.dao.api.UserDAO;
import org.example.model.Rating;
import org.example.model.Tag;
import org.example.model.User;
import org.mindrot.jbcrypt.BCrypt;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.sql.*;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class UserDAOImpl implements UserDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    private static final int WORKLOAD = 12;

    private String hashPassword(String plainPassword) {
        String salt = BCrypt.gensalt(WORKLOAD);
        return BCrypt.hashpw(plainPassword, salt);
    }

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
        String hashedPassWord = hashPassword(user.getPassword());
        String query = String.format("INSERT INTO user VALUES(%s, '%s', '%s', '%s', '%s'" +
                ", '%s', ?, '%s', '%s', null)",
                0, user.getUsername(), hashedPassWord, user.getName()
                , user.getEmail(), user.getPhone(), user.getGender(), user.getRole());
        try (Connection conn = ds.getConnection(); PreparedStatement pstm = conn.prepareStatement(query)) {
            pstm.setDate(1, Date.valueOf(user.getBirthday()));
            pstm.execute();
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void update(User user) {
        String  query = String.format("UPDATE user set name = '%s', phone = '%s', email = '%s'" +
                        ", gender = '%s', birthday = ? where id = '%s'",
                        user.getName(), user.getPhone(), user.getEmail(),
                        user.getGender(), user.getId());
        try (Connection conn = ds.getConnection(); PreparedStatement pstm = conn.prepareStatement(query)) {
            pstm.setDate(1, Date.valueOf(user.getBirthday()));
            pstm.execute();
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> findByUsername(String username) {
        String query = String.format("SELECT * FROM user u " +
                "WHERE u.username = '%s' LIMIT 0,1", username);
        User user = null;
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                user = User.fromResultSet(rs);
            }
            return Optional.ofNullable(user);
        } catch (SQLException sqlException) {
            return Optional.ofNullable(user);
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<User> findById(Integer id) {
        String query = String.format("SELECT * FROM user u WHERE u.id = %s", id);
        User user = null;
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                user = User.fromResultSet(rs);
            }
            return Optional.ofNullable(user);
        } catch (SQLException sqlException) {
            return Optional.ofNullable(user);
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean checkRegister(String username, String email) {
        String query = String.format("SELECT * FROM user u WHERE u.email = '%s' OR u.username = '%s'",
                email, username);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return  false;
            }
            return true;
        } catch (SQLException sqlException) {
            return false;
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean checkEmailExisted(String email) {
        String query = String.format("SELECT * FROM user u WHERE u.email = '%s'", email);
        boolean existed = false;
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                existed = true;
                break;
            }
        } catch (SQLException sqlException) {

        }
        return existed;
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void saveCart(Integer userId, String cartJSON) {
        User user = em.find(User.class, userId);
        if (user == null) throw new NoResultException();
        String query = String.format("UPDATE user u SET cart = '%s' WHERE u.id = %s", cartJSON, userId);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
        } catch (SQLException sqlException) {
            return;
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public boolean updatePassword(Integer userId, String oldPassword, String newPassword) {
        User user = em.find(User.class, userId);
        boolean isValidCredential = user != null && BCrypt.checkpw(oldPassword, user.getPassword());
        if (isValidCredential) {
            String newHashedPassword = hashPassword(newPassword);
            String query = String.format("UPDATE user u SET password = '%s' WHERE u.id = %s", newHashedPassword, userId);
            try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
                statement.execute(query);
                return true;
            } catch (SQLException sqlException) {
                return  false;
            }
        }
        return false;
    }
}