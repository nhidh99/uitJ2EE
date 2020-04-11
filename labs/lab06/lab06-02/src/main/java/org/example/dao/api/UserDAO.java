package org.example.dao.api;

import org.example.model.User;

import javax.ejb.Local;
import java.util.List;

@Local
public interface UserDAO {
    List<User> findAll();
}
