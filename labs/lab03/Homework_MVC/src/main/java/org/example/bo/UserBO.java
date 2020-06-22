package org.example.bo;

import org.example.dao.UserDAO;
import org.example.model.User;

import javax.servlet.ServletContext;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class UserBO {
    private ServletContext context;

    public UserBO(ServletContext context) { this.context = context; }

    public User login(String username, String password) {
        UserDAO userDAO = null;
        try {
            userDAO = new UserDAO();
            if(userDAO.checkLogin(username, password)) {
                return userDAO.findByUsername(username);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void createUser(User user) {
        UserDAO userDAO = new UserDAO();
        userDAO.createUser(user);
    }

    public void updateUser(User user) {
        UserDAO userDAO = new UserDAO();
        userDAO.updateUser(user);
    }

    public List<User> getUsers() {
        UserDAO userDAO = new UserDAO();
        return userDAO.getUsers();
    }
}
