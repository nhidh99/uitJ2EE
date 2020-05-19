package org.example.dao.api;

import org.example.model.Order;
import org.example.model.OrderOverview;

import javax.ejb.Local;
import java.util.List;

@Local
public interface OrderDAO {
    void save(Order order);

    List<OrderOverview> findOverviewsByUserId(Integer page, Integer userId);

    Long findTotalOrdersByUserId(Integer userId);
}
