package org.example.dao.api;

import org.example.model.Order;
import org.example.type.OrderStatus;

import javax.ejb.Local;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Local
public interface OrderDAO {
    void save(Order order);

    Optional<Order> findById(Integer id);

    Long findTotalOrder(String filter, String status);

    List<Order> findByFilter(String filter, String status, Integer page);

    List<Order> findByUserId(Integer page, Integer userId);

    List<Order> findByPages(Integer page);

    Long findTotalOrdersByUserId(Integer userId);

    void updateStatus(Integer orderId, OrderStatus orderStatus) throws SQLException;
}
