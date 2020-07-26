package org.example.dao.api;

import org.example.model.Order;
import org.example.type.OrderStatus;

import javax.ejb.Local;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Local
public interface OrderDAO {
    void save(Order order) throws SQLException;

    Optional<Order> findById(Integer id) throws SQLException;

    Long findTotalOrder(String filter, String status) throws SQLException;

    List<Order> findByFilter(String filter, String status, Integer page) throws SQLException;

    List<Order> findByUserId(Integer page, Integer userId) throws SQLException;

    List<Order> findByPages(Integer page) throws SQLException;

    Long findTotalOrdersByUserId(Integer userId) throws SQLException;

    void updateStatus(Integer orderId, OrderStatus orderStatus) throws SQLException;
}
