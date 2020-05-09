package org.example.dao.api;

import org.example.model.User;

import javax.ejb.Local;
import java.util.Optional;

@Local
public interface UserDAO {
    boolean login(String username, String password) throws Exception;

    void register(User user);

    String hashPassword(String plainPassword);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Integer id);

    boolean checkRegister(String username, String email);

    void update(User user);
}
