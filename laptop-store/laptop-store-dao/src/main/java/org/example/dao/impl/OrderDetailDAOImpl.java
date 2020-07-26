package org.example.dao.impl;

import org.example.dao.api.OrderDetailDAO;
import org.example.model.OrderDetail;
import org.example.model.Promotion;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.sql.*;
import java.util.LinkedList;
import java.util.List;

@Stateless
@LocalBean
public class OrderDetailDAOImpl implements OrderDetailDAO {

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    public List<OrderDetail> findByOrderId(Integer orderId) throws SQLException {
        String sql = "SELECT id, product_id, product_name, product_type, quantity, unit_price, total_price " +
                "FROM order_detail o " +
                "WHERE o.order_id = ? ";

        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, orderId);
            List<OrderDetail> orderDetails = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                OrderDetail orderDetail = OrderDetail.fromResultSet(rs);

                orderDetails.add(orderDetail);
            }
            return orderDetails;
        }
    }
}
