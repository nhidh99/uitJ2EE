package tacos.service;

import org.springframework.data.jpa.repository.JpaRepository;
import tacos.model.Order;

public interface OrderService extends JpaRepository<Order, Long> { }