package org.example.dao.api;

import org.example.model.User;
import org.example.type.Role;

import javax.ejb.Local;
import java.util.Optional;

@Local
public interface UserDAO {
    void delete(Integer id);
    boolean login(String username, String password);
    void register(User user);
    User findByUsername(String username);
    Optional<User> findById(Integer id);
    boolean checkRegister(String username, String email);
}
