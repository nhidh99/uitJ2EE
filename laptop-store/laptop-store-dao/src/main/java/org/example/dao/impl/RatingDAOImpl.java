package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.RatingDAO;
import org.example.dao.api.RatingReplyDAO;
import org.example.dao.api.UserDAO;
import org.example.model.Laptop;
import org.example.model.Rating;
import org.example.model.RatingReply;
import org.example.model.User;

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

@Stateless
@LocalBean
public class RatingDAOImpl implements RatingDAO {

    private static final Integer ELEMENT_PER_ADMIN_BLOCK = 5;

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @EJB(mappedName = "RatingReplyDAOImpl")
    private RatingReplyDAO ratingReplyDAO;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    public Optional<Rating> findById(Integer id) throws SQLException {
        String sql = "SELECT id, rating, comment_title, comment_detail, rating_date, approve_status " +
                "FROM Rating r " +
                "WHERE r.id = ?";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, id);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                Rating rating = Rating.fromResultSet(rs);
                return Optional.ofNullable(rating);
            }
        }
        return Optional.empty();
    }

    @Override
    public void save(Rating rating) throws SQLException {
        String sql = "INSERT INTO rating (user_id, laptop_id, rating, comment_title, comment_detail, rating_date) VALUES (?,?,?,?,?,?)";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            try {
                statement.setInt(1, rating.getUser().getId());
                statement.setInt(2, rating.getLaptop().getId());
                statement.setInt(3, rating.getRating());
                statement.setString(4, rating.getCommentTitle());
                statement.setString(5, rating.getCommentDetail());
                statement.setDate(6, Date.valueOf(rating.getRatingDate()));
                statement.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public List<Rating> findByProductId(Integer laptopId) throws SQLException {
        String sql = "SELECT id, user_id, rating, comment_title, comment_detail, rating_date, approve_status  FROM Rating r " +
                "WHERE r.laptop_id = ? " +
                "AND r.approve_status = 1 " +
                "AND (r.comment_title IS NOT NULL OR r.comment_detail IS NOT NULL)";

        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, laptopId);
            List<Rating> ratings = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Rating rating = Rating.fromResultSet(rs);
                User user = userDAO.findById(rs.getInt("user_id")).orElseThrow(NotFoundException::new);
                rating.setUser(user);
                List<RatingReply> replies = ratingReplyDAO.findByRatingId(rs.getInt("id"));
                rating.setReplies(replies);
                ratings.add(rating);
            }
            return ratings;
        }
    }

    @Override
    public List<Rating> findByFilter(String id, String status, Integer page) throws SQLException {
        String sql = "SELECT id, rating, comment_title, comment_detail, rating_date, approve_status FROM Rating r " +
                "WHERE (r.id is NULL OR r.id = '' OR r.id LIKE ?) " +
                "AND (r.approve_status is NULL OR r.approve_status LIKE ?) LIMIT ?,? ";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setString(1, "%" + id + "%");
            statement.setString(2, "%" + status + "%");
            statement.setInt(3, ELEMENT_PER_ADMIN_BLOCK * (page - 1));
            statement.setInt(4, ELEMENT_PER_ADMIN_BLOCK);

            List<Rating> ratings = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Rating rating = Rating.fromResultSet(rs);
                ratings.add(rating);
            }
            return ratings;
        }
    }

    @Override
    public Long findTotalRatingByProductId(Integer laptopId) throws SQLException {
        String sql = "SELECT COUNT(id) AS Total FROM Rating r WHERE r.laptop_id = ? " +
                "AND r.approve_status = 1 " +
                "AND (r.comment_title IS NOT NULL OR r.comment_detail IS NOT NULL)";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, laptopId);
            ResultSet rs = statement.executeQuery();
            if (rs.next()) {
                return rs.getLong("Total");
            }
        }
        return null;
    }

    @Override
    public Long findTotalRatingByFilter(String id, String status) throws SQLException {
        if (id == null && status == null) {
            String sql = "SELECT COUNT(id) AS Total FROM Rating r";
            try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
                ResultSet rs = statement.executeQuery(sql);
                if (rs.next()) {
                    return rs.getLong("Total");
                }
            }
        } else {
            String sql = "SELECT COUNT(id) AS Total FROM Rating r" +
                    "WHERE (r.id IS NULL OR r.id = '' OR r.id LIKE ?)" +
                    "AND (r.approve_status IS NULL OR r.approve_status LIKE ?)";
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
    public List<Rating> findByPage(Integer page) throws SQLException {
        String sql = "SELECT id, user_id, laptop_id, rating, comment_title, comment_detail, rating_date, approve_status " +
                "FROM Rating r ORDER BY r.id DESC LIMIT ?, ?";
        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, ELEMENT_PER_ADMIN_BLOCK * (page - 1));
            statement.setInt(2, ELEMENT_PER_ADMIN_BLOCK);

            List<Rating> ratings = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                Rating rating = Rating.fromResultSet(rs);
//                User user = userDAO.findById(rs.getInt("user_id")).orElseThrow(NotFoundException::new);
//                rating.setUser(user);
                Laptop laptop = laptopDAO.findById(rs.getInt("laptop_id")).orElseThrow(NotFoundException::new);
                rating.setLaptop(laptop);
                ratings.add(rating);
            }
            return ratings;
        }
    }

    @Override
    public void delete(Integer id) throws SQLException {
        try (Connection conn = ds.getConnection();) {
            try {
                conn.setAutoCommit(false);
                //Get Laptop ID
                String getLaptopIdQuery = "SELECT laptop_id FROM rating r WHERE r.id = ?";
                PreparedStatement getLaptopIdStatement = conn.prepareStatement(getLaptopIdQuery);
                getLaptopIdStatement.setInt(1, id);
                ResultSet rs = getLaptopIdStatement.executeQuery();
                Integer laptopId = rs.next() ? rs.getInt("laptop_id") : null;

                //Delete rating
                String sql = "DELETE FROM rating WHERE rating.id = ?";
                PreparedStatement statement = conn.prepareStatement(sql);
                statement.setInt(1, id);
                statement.executeUpdate();

                //Delete rating replies
                String deleteReplySql = "DELETE FROM rating_reply WHERE rating_reply.rating_id = ?";
                PreparedStatement deleteReplyStatement = conn.prepareStatement(deleteReplySql);
                deleteReplyStatement.setInt(1, id);
                deleteReplyStatement.executeUpdate();

                if (laptopId != null) {
                    //Get avg rating
                    String getAvgRatingQuery = "SELECT AVG(r.rating) AS avg_rating FROM rating r WHERE r.laptop_id = ? AND r.approve_status = 1";
                    PreparedStatement getAvgRatingStatement = conn.prepareStatement(getAvgRatingQuery);
                    getAvgRatingStatement.setInt(1, laptopId);
                    ResultSet avgRatingRs = getAvgRatingStatement.executeQuery();
                    Float avgRating = avgRatingRs.next() ? avgRatingRs.getFloat("avg_rating") : null;
                    avgRating = (avgRating.equals(0.0f) || avgRating == null) ? 5.0f : avgRating;
                    //Update laptop rating
                    String updateLaptopRating = "UPDATE laptop " +
                            "SET laptop.avg_rating = ? " +
                            "WHERE laptop.id = ?";
                    PreparedStatement updateLaptopRatingStatement = conn.prepareStatement(updateLaptopRating);
                    updateLaptopRatingStatement.setFloat(1, avgRating);
                    updateLaptopRatingStatement.setInt(2, laptopId);
                    updateLaptopRatingStatement.executeUpdate();
                }
                //commit
                conn.commit();
            } catch (Exception e) {
                e.printStackTrace();
                conn.rollback();
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

    @Override
    public void approve(Integer id) throws SQLException {
        try (Connection conn = ds.getConnection();) {
            try {
                conn.setAutoCommit(false);
                //Update approve status
                String updateApproveStatus = "UPDATE rating " +
                        "SET rating.approve_status = 1 " +
                        "WHERE rating.id = ?";
                PreparedStatement updateApproveStatusStatement = conn.prepareStatement(updateApproveStatus);
                updateApproveStatusStatement.setInt(1, id);
                updateApproveStatusStatement.executeUpdate();

                //Get laptop Id
                String getLaptopIdQuery = "SELECT laptop_id FROM rating r WHERE r.id = ?";
                PreparedStatement getLaptopIdStatement = conn.prepareStatement(getLaptopIdQuery);
                getLaptopIdStatement.setInt(1, id);
                ResultSet rs = getLaptopIdStatement.executeQuery();
                Integer laptopId = rs.next() ? rs.getInt("laptop_id") : null;

                //Update avg rating for laptop id
                if (laptopId != null) {
                    //Get avg rating
                    String getAvgRatingQuery = "SELECT AVG(r.rating) AS avg_rating FROM rating r WHERE r.laptop_id = ? AND r.approve_status = 1";
                    PreparedStatement getAvgRatingStatement = conn.prepareStatement(getAvgRatingQuery);
                    getAvgRatingStatement.setInt(1, laptopId);
                    ResultSet avgRatingRs = getAvgRatingStatement.executeQuery();
                    Float avgRating = avgRatingRs.next() ? avgRatingRs.getFloat("avg_rating") : null;
                    avgRating = (avgRating.equals(0.0f) || avgRating == null) ? 5.0f : avgRating;
                    //Update laptop rating
                    String updateLaptopRating = "UPDATE laptop " +
                            "SET laptop.avg_rating = ? " +
                            "WHERE laptop.id = ?";
                    PreparedStatement updateLaptopRatingStatement = conn.prepareStatement(updateLaptopRating);
                    updateLaptopRatingStatement.setFloat(1, avgRating);
                    updateLaptopRatingStatement.setInt(2, laptopId);
                    updateLaptopRatingStatement.executeUpdate();
                }
                conn.commit();
            } catch(Exception e) {
                e.printStackTrace();
                conn.rollback();
            }  finally {
                conn.setAutoCommit(true);
            }
        }
    }

    @Override
    public void deny(Integer id) throws SQLException {

        try (Connection conn = ds.getConnection();) {
            try {
                conn.setAutoCommit(false);
                //Update approve status
                String updateApproveStatus = "UPDATE rating " +
                        "SET rating.approve_status = 0 " +
                        "WHERE rating.id = ?";
                PreparedStatement updateApproveStatusStatement = conn.prepareStatement(updateApproveStatus);
                updateApproveStatusStatement.setInt(1, id);
                updateApproveStatusStatement.executeUpdate();

                //Get laptop Id
                String getLaptopIdQuery = "SELECT laptop_id FROM rating r WHERE r.id = ?";
                PreparedStatement getLaptopIdStatement = conn.prepareStatement(getLaptopIdQuery);
                getLaptopIdStatement.setInt(1, id);
                ResultSet rs = getLaptopIdStatement.executeQuery();
                Integer laptopId = rs.next() ? rs.getInt("laptop_id") : null;

                //Update avg rating for laptop id
                if (laptopId != null) {
                    //Get avg rating
                    String getAvgRatingQuery = "SELECT AVG(r.rating) AS avg_rating FROM rating r WHERE r.laptop_id = ? AND r.approve_status = 1";
                    PreparedStatement getAvgRatingStatement = conn.prepareStatement(getAvgRatingQuery);
                    getAvgRatingStatement.setInt(1, laptopId);
                    ResultSet avgRatingRs = getAvgRatingStatement.executeQuery();
                    Float avgRating = avgRatingRs.next() ? avgRatingRs.getFloat("avg_rating") : null;
                    avgRating = (avgRating.equals(0.0f) || avgRating == null) ? 5.0f : avgRating;

                    //Update laptop rating
                    String updateLaptopRating = "UPDATE laptop " +
                            "SET laptop.avg_rating = ? " +
                            "WHERE laptop.id = ?";
                    PreparedStatement updateLaptopRatingStatement = conn.prepareStatement(updateLaptopRating);
                    updateLaptopRatingStatement.setFloat(1, avgRating);
                    updateLaptopRatingStatement.setInt(2, laptopId);
                    updateLaptopRatingStatement.executeUpdate();
                }
                conn.commit();
            } catch (Exception e) {
                e.printStackTrace();
                conn.rollback();
            } finally {
                conn.setAutoCommit(true);
            }
        }
    }

}