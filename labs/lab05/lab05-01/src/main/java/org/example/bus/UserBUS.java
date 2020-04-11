package org.example.bus;

import org.example.dao.UserDAO;
import org.example.dto.UserDTO;

public class UserBUS {

    private UserDAO userDAO = new UserDAO();

    public boolean login(String username, String password) {
        return userDAO.checkLogin(username, password);
    }

    public boolean register(UserDTO userDTO) throws IllegalArgumentException {
        boolean isExistedUsername = userDAO.checkExistsUsername(userDTO.getUsername());
        if (isExistedUsername) {
            throw new IllegalArgumentException("Username has existed");
        } else {
            return userDAO.insertUser(userDTO);
        }
    }

    public UserDTO findByUsername(String username) {
        return userDAO.findByUsername(username);
    }
}