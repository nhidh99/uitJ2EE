package org.example.dao.api;

import org.example.model.OrderDetail;

import javax.ejb.Local;
import java.util.List;

@Local
public interface OrderDetailDAO {
    List<OrderDetail> findByOrderId(Integer orderId);
}
