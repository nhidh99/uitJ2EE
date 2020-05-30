package org.example.dao.api;

import org.example.model.User;

import javax.ejb.Local;
import java.util.Optional;

@Local
public interface UserDAO {
    boolean login(String username, String password) throws Exception;

    boolean checkRegister(String username, String email);

    boolean checkEmailExisted(String email);

    void register(User user);

    void update(User user);

    void saveCart(Integer userId, String cartJSON);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Integer id);

    boolean updatePassword(Integer userId, String oldPassword, String newPassword);
}