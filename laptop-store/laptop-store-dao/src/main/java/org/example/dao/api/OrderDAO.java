package org.example.dao.api;

import org.example.model.Order;

import javax.ejb.Local;

@Local
public interface OrderDAO {
    void save(Order order);
}
