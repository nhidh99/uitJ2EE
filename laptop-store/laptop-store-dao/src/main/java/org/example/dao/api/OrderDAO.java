package org.example.dao.api;

import org.example.model.Order;
import org.example.model.OrderOverview;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface OrderDAO {
    void save(Order order);

    Optional<Order> findById(Integer id);

    List<Order> findOrdersByUserId(Integer page, Integer userId);

    Long findTotalOrdersByUserId(Integer userId);
}
