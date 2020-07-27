package org.example.dao.impl;

import org.example.dao.api.*;
import org.example.model.*;
import org.example.type.OrderStatus;
import org.example.type.ProductType;

import javax.annotation.Resource;
import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.sql.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless
@LocalBean
public class OrderDAOImpl implements OrderDAO {

    private static final Integer ELEMENT_PER_BLOCK = 5;

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @EJB(mappedName = "OrderDetailDAOImpl")
    private OrderDetailDAO orderDetailDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    public void save(Order order) throws SQLException {
        if (order.getId() == null) {
            try (Connection conn = ds.getConnection()) {
                try {
                    conn.setAutoCommit(false);

                    insert(conn, order);
                    clearUserCart(conn, order.getUser().getId());

                    conn.commit();
                } catch (Exception e) {
                    try {
                        conn.rollback();
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    throw new SQLException(e);
                } finally {
                    conn.setAutoCommit(true);
                }
            }
        } else {
            update(order);
        }
    }

    private void insert(Connection conn, Order order) throws SQLException {
        try {
            //Insert new order
            String insertOrder = "INSERT INTO `order` (transport_fee, total_price, status, order_date, delivery_date, " +
                    "receiver_name, receiver_phone, address_num, street, ward, district, city, user_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

            PreparedStatement insertOrderStatement = conn.prepareStatement(insertOrder);
            insertOrderStatement.setInt(1, order.getTransportFee());
            insertOrderStatement.setLong(2, order.getTotalPrice());
            insertOrderStatement.setString(3, order.getStatus().toString());
            insertOrderStatement.setDate(4, Date.valueOf(order.getOrderDate()));
            insertOrderStatement.setDate(5, Date.valueOf(order.getDeliveryDate()));
            insertOrderStatement.setString(6, order.getReceiverName());
            insertOrderStatement.setString(7, order.getReceiverPhone());
            insertOrderStatement.setString(8, order.getAddressNum());
            insertOrderStatement.setString(9, order.getStreet());
            insertOrderStatement.setString(10, order.getWard());
            insertOrderStatement.setString(11, order.getDistrict());
            insertOrderStatement.setString(12, order.getCity());
            insertOrderStatement.setInt(13, order.getUser().getId());
            insertOrderStatement.executeUpdate();

            //GET LAST_INSERT_ID
            String lastIdSql = "SELECT LAST_INSERT_ID() AS id";
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(lastIdSql);
            Integer newOrderId = rs.next() ? rs.getInt("id") : null;

            //Insert order details of new order
            insertNewDetails(conn, order, newOrderId);
        } catch (SQLException e) {
            throw new SQLException(e);
        }
    }

    private void insertNewDetails(Connection conn, Order order, Integer newOrderId) {
        order.getOrderDetails().forEach(detail -> {
            String insertDetail = "INSERT INTO order_detail (product_id, product_name, product_type, quantity, unit_price, total_price, order_id) " +
                    "VALUES (?,?,?,?,?,?,?)";
            try (PreparedStatement insertDetailStatement = conn.prepareStatement(insertDetail)) {
                insertDetailStatement.setInt(1, detail.getProductId());
                insertDetailStatement.setString(2, detail.getProductName());
                insertDetailStatement.setString(3, detail.getProductType().toString());
                insertDetailStatement.setInt(4, detail.getQuantity());
                insertDetailStatement.setLong(5, detail.getUnitPrice());
                insertDetailStatement.setLong(6, detail.getTotalPrice());
                insertDetailStatement.setInt(7, newOrderId);
                insertDetailStatement.executeUpdate();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void clearUserCart(Connection conn, Integer userId) throws SQLException {
        String sql = "UPDATE `user` SET cart = '{}' WHERE id = ?";
        try (PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.executeUpdate();
        }
    }

    private void update(Order order) {
    }

    @Override
    public Optional<Order> findById(Integer id) throws SQLException {
        String sql = "SELECT id, transport_fee, total_price, status, order_date, delivery_date, " +
                "receiver_name, receiver_phone, address_num, street, ward, district, city, user_id " +
                "FROM `Order` o " +
                "WHERE o.id = ?";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                Order order = Order.fromResultSet(rs);
                User user = userDAO.findById(rs.getInt("user_id")).orElseThrow(NotFoundException::new);
                order.setUser(user);
                List<OrderDetail> orderDetails = orderDetailDAO.findByOrderId(order.getId());
                order.setOrderDetails(orderDetails);
                return Optional.ofNullable(order);
            }
        }
        return Optional.empty();
    }

    @Override
    public List<Order> findByUserId(Integer page, Integer userId) throws SQLException {
        String sql = "SELECT id, transport_fee, total_price, status, order_date, delivery_date, " +
                "receiver_name, receiver_phone, address_num, street, ward, district, city " +
                "FROM `Order` o " +
                "WHERE o.user_id = ? ORDER BY o.id DESC LIMIT ?,? ";

        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, userId);
            statement.setInt(2, ELEMENT_PER_BLOCK * (page - 1));
            statement.setInt(3, ELEMENT_PER_BLOCK);

            List<Order> orders = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Order order = Order.fromResultSet(rs);
                List<OrderDetail> orderDetails = orderDetailDAO.findByOrderId(order.getId());
                order.setOrderDetails(orderDetails);
                orders.add(order);
            }
            return orders;
        }
    }

    @Override
    public Long findTotalOrder(String id, String status) throws SQLException {
        if (id == null && status == null) {
            String sql = "SELECT COUNT(id) AS Total FROM `Order`";
            try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
                ResultSet rs = statement.executeQuery(sql);
                if (rs.next()) {
                    return rs.getLong("Total");
                }
            }
        } else {
            String sql = "SELECT COUNT(id) AS Total FROM `Order` o " +
                    "WHERE (o.id is NULL OR o.id = '' OR o.id LIKE ? ) " +
                    "AND (o.status is NULL OR o.status = '' OR o.status LIKE ? )";
            try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
                statement.setString(1, "%" + id + "%");
                statement.setString(2, "%" + status + "%");
                ResultSet rs = statement.executeQuery();
                if (rs.next()) {
                    return rs.getLong("Total");
                }
            }
        }
        return null;
    }

    @Override
    public List<Order> findByFilter(String id, String status, Integer page) throws SQLException {
        String sql = "SELECT id, transport_fee, total_price, status, order_date, delivery_date, " +
                "receiver_name, receiver_phone, address_num, street, ward, district, city FROM `Order` o " +
                "WHERE (o.id is NULL OR o.id = '' OR o.id LIKE ?)" +
                "AND (o.status is NULL OR o.status = '' OR o.status LIKE ?) ORDER BY o.id DESC LIMIT ?,?";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setString(1, "%" + id + "%");
            statement.setString(2, "%" + status + "%");
            statement.setInt(3, ELEMENT_PER_BLOCK * (page - 1));
            statement.setInt(4, ELEMENT_PER_BLOCK);

            List<Order> orders = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Order order = Order.fromResultSet(rs);
                List<OrderDetail> orderDetails = orderDetailDAO.findByOrderId(order.getId());
                order.setOrderDetails(orderDetails);
                orders.add(order);
            }
            return orders;
        }
    }

    @Override
    public List<Order> findByPages(Integer page) throws SQLException {
        String sql = "SELECT id, transport_fee, total_price, status, order_date, delivery_date, " +
                "receiver_name, receiver_phone, address_num, street, ward, district, city FROM `Order` o " +
                "ORDER BY o.id DESC LIMIT ?,?";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, ELEMENT_PER_BLOCK * (page - 1));
            statement.setInt(2, ELEMENT_PER_BLOCK);

            List<Order> orders = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Order order = Order.fromResultSet(rs);
                List<OrderDetail> orderDetails = orderDetailDAO.findByOrderId(order.getId());
                order.setOrderDetails(orderDetails);
                orders.add(order);
            }
            return orders;
        }
    }

    @Override
    public Long findTotalOrdersByUserId(Integer userId) throws SQLException {
        String query = "SELECT COUNT(id) AS TOTAL FROM `Order` o WHERE o.user_id = ?";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(query)) {
            statement.setInt(1, userId);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                return rs.getLong("Total");
            }
        }
        return null;
    }

    @Override
    public void updateStatus(Integer orderId, OrderStatus orderStatus) throws SQLException {
        try (Connection conn = ds.getConnection()) {
            try {
                conn.setAutoCommit(false);

                Order order = findById(orderId).orElseThrow(NotFoundException::new);
                if (order.getStatus().isBeforePackaged() && orderStatus.isPackaged()) {
                    updateDeliveredProductQuantitiesByOrder(conn, order);
                }
                if (order.getStatus().isPackaged() && orderStatus.isCanceled()) {
                    updateRestockedProductQuantitiesByOrder(conn, order);
                }

                //Update order status
                String updateOrderStatusSql = "UPDATE `order` SET status = ? WHERE id = ?";
                PreparedStatement updateOrderStatusStatement = conn.prepareStatement(updateOrderStatusSql);
                updateOrderStatusStatement.setString(1, orderStatus.toString());
                updateOrderStatusStatement.setInt(2, order.getId());
                updateOrderStatusStatement.executeUpdate();

                conn.commit();
            } catch (Exception e) {
                try {
                    conn.rollback();
                } catch (Exception ex) {
                    ex.printStackTrace();
                }
                throw new SQLException(e);
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    private void updateDeliveredProductQuantitiesByOrder(Connection conn, Order order) throws SQLException {
        List<OrderDetail> laptops = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .collect(Collectors.toList());
        List<OrderDetail> promotions = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.PROMOTION)
                .collect(Collectors.toList());
        updateDeliveredLaptopQuantities(conn, laptops);
        updateDeliveredPromotionQuantities(conn, promotions);
    }

    private void updateDeliveredLaptopQuantities(Connection conn, List<OrderDetail> orderedLaptops) throws SQLException {
        List<Integer> laptopIds = orderedLaptops.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Laptop> laptops = laptopDAO.findByIds(laptopIds);
        if (laptops.size() != orderedLaptops.size()) {
            throw new SQLException();
        }

        for (Laptop laptop : laptops) {
            OrderDetail orderedLaptop = orderedLaptops.stream()
                    .filter(l -> l.getProductId().equals(laptop.getId()))
                    .findFirst().orElseThrow(SQLException::new);
            int remainQuantity = laptop.getQuantity() - orderedLaptop.getQuantity();
            if (remainQuantity >= 0) {
                laptop.setQuantity(remainQuantity);
            } else {
                throw new SQLException();
            }
        }
        laptops.forEach(laptop -> {
            String updateQuantitySql = "UPDATE laptop SET quantity = ? WHERE id = ?";
            try {
                PreparedStatement updateQuantityStatement = conn.prepareStatement(updateQuantitySql);
                updateQuantityStatement.setInt(1, laptop.getQuantity());
                updateQuantityStatement.setInt(2, laptop.getId());
                updateQuantityStatement.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        });
    }

    private void updateDeliveredPromotionQuantities(Connection conn, List<OrderDetail> orderedPromotions) throws SQLException {
        List<Integer> promotionIds = orderedPromotions.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Promotion> promotions = promotionDAO.findByIds(promotionIds);
        if (promotions.size() != promotionIds.size()) {
            throw new SQLException();
        }

        for (Promotion promotion : promotions) {
            OrderDetail orderedLaptop = orderedPromotions.stream()
                    .filter(p -> p.getProductId().equals(promotion.getId()))
                    .findFirst().orElseThrow(SQLException::new);
            int remainQuantity = promotion.getQuantity() - orderedLaptop.getQuantity();
            if (remainQuantity >= 0) {
                promotion.setQuantity(remainQuantity);
            } else {
                throw new SQLException();
            }
        }
        promotions.forEach(promotion -> {
            String updateQuantitySql = "UPDATE promotion SET quantity = ? WHERE id = ?";
            try {
                PreparedStatement updateQuantityStatement = conn.prepareStatement(updateQuantitySql);
                updateQuantityStatement.setInt(1, promotion.getQuantity());
                updateQuantityStatement.setInt(2, promotion.getId());
                updateQuantityStatement.executeUpdate();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }

    private void updateRestockedProductQuantitiesByOrder(Connection conn, Order order) {
        List<OrderDetail> laptops = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.LAPTOP)
                .collect(Collectors.toList());
        List<OrderDetail> promotions = order.getOrderDetails().stream()
                .filter(detail -> detail.getProductType() == ProductType.PROMOTION)
                .collect(Collectors.toList());
        updateRestockedLaptopQuantities(conn, laptops);
        updateRestockedPromotionQuantities(conn, promotions);
    }

    private void updateRestockedLaptopQuantities(Connection conn, List<OrderDetail> orderedLaptops) {
        List<Integer> laptopIds = orderedLaptops.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Laptop> laptops = laptopDAO.findByIds(laptopIds);
        laptops.forEach(laptop -> {
            OrderDetail orderedLaptop = orderedLaptops.stream()
                    .filter(l -> l.getProductId().equals(laptop.getId()))
                    .findFirst().orElseThrow(BadRequestException::new);
            int remainQuantity = laptop.getQuantity() + orderedLaptop.getQuantity();
            laptop.setQuantity(remainQuantity);
        });
        laptops.forEach(laptop -> {
            String updateQuantitySql = "UPDATE laptop SET quantity = ? WHERE id = ?";
            try {
                PreparedStatement updateQuantityStatement = conn.prepareStatement(updateQuantitySql);
                updateQuantityStatement.setInt(1, laptop.getQuantity());
                updateQuantityStatement.setInt(2, laptop.getId());
                updateQuantityStatement.executeUpdate();
            } catch (SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        });
    }

    private void updateRestockedPromotionQuantities(Connection conn, List<OrderDetail> orderedPromotions) {
        List<Integer> promotionIds = orderedPromotions.stream().map(OrderDetail::getProductId).collect(Collectors.toList());
        List<Promotion> promotions = promotionDAO.findByIds(promotionIds);
        promotions.forEach(promotion -> {
            OrderDetail orderedLaptop = orderedPromotions.stream()
                    .filter(p -> p.getProductId().equals(promotion.getId()))
                    .findFirst().orElseThrow(BadRequestException::new);
            int remainQuantity = promotion.getQuantity() + orderedLaptop.getQuantity();
            promotion.setQuantity(remainQuantity);
        });
        promotions.forEach(promotion -> {
            String updateQuantitySql = "UPDATE promotion SET quantity = ? WHERE id = ?";
            try {
                PreparedStatement updateQuantityStatement = conn.prepareStatement(updateQuantitySql);
                updateQuantityStatement.setInt(1, promotion.getQuantity());
                updateQuantityStatement.setInt(2, promotion.getId());
                updateQuantityStatement.executeUpdate();
            } catch (SQLException e) {
                throw new RuntimeException(e);
            }
        });
    }
}