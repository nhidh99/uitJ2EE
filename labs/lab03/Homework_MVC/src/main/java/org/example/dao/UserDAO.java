package org.example.dao;

import org.example.model.User;
import org.example.util.DBUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UserDAO {
    public void updateUser(User user) {
        String query = "UPDATE `user` SET password = ?, firstname = ?, lastname = ?, sex = ?, address = ?, email = ?, mobilephone = ? WHERE username = ? ";
        try (Connection conn = DBUtil.getConnection()) {
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, user.getPassword());
            statement.setString(2, user.getFirstName());
            statement.setString(3, user.getLastName());
            statement.setString(4, user.getSex());
            statement.setString(5, user.getAddress());
            statement.setString(6, user.getEmail());
            statement.setString(7, user.getMobilePhone());
            statement.setString(8, user.getUsername());
            statement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public boolean checkLogin(String username, String password) {
        String query = "select * from `user` WHERE username = ? and password = ?";
        try (Connection conn = DBUtil.getConnection()) {
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, username);
            statement.setString(2, password);
            try (ResultSet rs = statement.executeQuery()) {
                return rs.next();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public User findByUsername(String username) {
        String query = "select * from `user` WHERE username = ?";
        try (Connection conn = DBUtil.getConnection()) {
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, username);
            try (ResultSet rs = statement.executeQuery()) {
                if (rs.next()) {
                    return User.builder()
                            .username(rs.getString("username"))
                            .password(rs.getString("password"))
                            .firstName(rs.getString("firstname"))
                            .lastName(rs.getString("lastname"))
                            .sex(rs.getString("sex"))
                            .address(rs.getString("address"))
                            .email(rs.getString("email"))
                            .mobilePhone(rs.getString("mobilephone"))
                            .groupId(rs.getInt("groupid")).build();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean checkRegister(User user) {
        String query = "select * from `user` WHERE username = ? OR email = ?";
        try (Connection conn = DBUtil.getConnection()) {
            PreparedStatement statement = conn.prepareStatement(query);
            statement.setString(1, user.getUsername());
            statement.setString(2, user.getEmail());
            try (ResultSet rs = statement.executeQuery()) {
                return rs.next() ? false : true;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public void createUser(User user) {
        if (checkRegister(user)) {
            String query = "INSERT INTO `user` VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (Connection conn = DBUtil.getConnection()) {
                PreparedStatement statement = conn.prepareStatement(query);
                statement.setString(1, user.getUsername());
                statement.setString(2, user.getPassword());
                statement.setString(3, user.getFirstName());
                statement.setString(4, user.getLastName());
                statement.setString(5, user.getSex());
                statement.setString(6, user.getAddress());
                statement.setString(7, user.getEmail());
                statement.setString(8, user.getMobilePhone());
                statement.setInt(9, user.getGroupId());
                statement.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public List<User> getUsers() {
        String sql = "SELECT * from `user`";
        List<User> list = new ArrayList<User>();
        try (Connection conn = DBUtil.getConnection();
             Statement statement = conn.createStatement()) {
            try (ResultSet rs = statement.executeQuery(sql)) {
                while (rs.next()) {
                    list.add(User.builder()
                            .username(rs.getString("username"))
                            .password(rs.getString("password"))
                            .firstName(rs.getString("firstname"))
                            .lastName(rs.getString("lastname"))
                            .sex(rs.getString("sex"))
                            .address(rs.getString("address"))
                            .email(rs.getString("email"))
                            .mobilePhone(rs.getString("mobilephone"))
                            .groupId(rs.getInt("groupid")).build());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        return list;
    }
}
