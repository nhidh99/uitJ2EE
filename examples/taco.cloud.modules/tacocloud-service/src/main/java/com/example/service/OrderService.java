package com.example.service;

import com.example.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderService extends JpaRepository<Order, Long> { }