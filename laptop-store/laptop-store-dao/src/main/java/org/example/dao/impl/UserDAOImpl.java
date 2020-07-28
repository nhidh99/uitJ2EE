package org.example.dao.impl;

import org.example.dao.api.UserDAO;
import org.example.model.User;
import org.mindrot.jbcrypt.BCrypt;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.sql.DataSource;
import javax.ws.rs.BadRequestException;
import java.sql.*;
import java.util.Optional;

@Stateless
@LocalBean
public class UserDAOImpl implements UserDAO {

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    private static final int WORKLOAD = 12;

    private String hashPassword(String plainPassword) {
        String salt = BCrypt.gensalt(WORKLOAD);
        return BCrypt.hashpw(plainPassword, salt);
    }

    @Override
    public boolean login(String username, String plainPassword) {
        Optional<User> optUser = findByUsername(username);
        if (optUser.isPresent()) {
            String hashedPassword = optUser.get().getPassword();
            return BCrypt.checkpw(plainPassword, hashedPassword);
        }
        return false;
    }

    @Override
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
    public void saveCart(Integer userId, String cartJSON) {
        String selectUser = String.format("SELECT id FROM user where id = %s", userId);
        String query = String.format("UPDATE user u SET cart = '%s' WHERE u.id = %s", cartJSON, userId);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(selectUser);
            if(rs.next()) {
                statement.executeQuery(query);
            }
            else {
                throw new BadRequestException();
            }
        } catch (SQLException sqlException) {
            return;
        }
    }

    @Override
    public boolean updatePassword(Integer userId, String oldPassword, String newPassword) {
        boolean isValidCredential = false;
        String selectUser = String.format("SELECT * FROM user where id = %s", userId);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(selectUser);
            if(rs.next()) {
                User user = User.fromResultSet(rs);
                if(BCrypt.checkpw(oldPassword, user.getPassword())) {
                    isValidCredential = true;
                }
            }
        }
        catch (SQLException sqlException) {

        }
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