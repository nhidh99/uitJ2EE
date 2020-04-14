package org.example.dao.api;

import org.example.model.User;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface UserDAO {
    List<User> findAll();
    Optional<User> findById(String id);
}