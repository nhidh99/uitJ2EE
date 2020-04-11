package com.example.jug.service;

import com.example.jug.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserService extends JpaRepository<User, String> {
}
