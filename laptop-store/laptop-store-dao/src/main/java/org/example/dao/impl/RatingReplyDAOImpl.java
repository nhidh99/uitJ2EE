package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.RatingDAO;
import org.example.dao.api.RatingReplyDAO;
import org.example.dao.api.UserDAO;
import org.example.model.OrderDetail;
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
import javax.ws.rs.NotFoundException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Date;
import java.util.LinkedList;
import java.util.List;

@LocalBean
@Stateless
public class RatingReplyDAOImpl implements RatingReplyDAO {

    @EJB(mappedName = "RatingDAOImpl")
    private RatingDAO ratingDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    public void save(RatingReply ratingReply) throws SQLException {
        String sql = "INSERT INTO rating_reply (rating_id, user_id, reply, reply_date) VALUES (?,?,?,?)";

        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            try {
                statement.setInt(1, ratingReply.getRating().getId());
                statement.setInt(2, ratingReply.getUser().getId());
                statement.setString(3, ratingReply.getReply());
                statement.setDate(4, Date.valueOf(ratingReply.getReplyDate()));
                statement.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public List<RatingReply> findByRatingId(Integer ratingId) throws SQLException {
        String sql = "SELECT id, rating_id, user_id, reply, reply_date " +
                "FROM rating_reply r " +
                "WHERE r.rating_id = ? ";

        try (Connection conn = ds.getConnection(); PreparedStatement statement = conn.prepareStatement(sql)) {
            statement.setInt(1, ratingId);
            List<RatingReply> replies = new LinkedList<>();
            ResultSet rs = statement.executeQuery();
            while (rs.next()) {
                RatingReply reply = RatingReply.fromResultSet(rs);
                User user = userDAO.findById(rs.getInt("user_id")).orElseThrow(NotFoundException::new);
                reply.setUser(user);
                Rating rating = ratingDAO.findById(rs.getInt("rating_id")).orElseThrow(NotFoundException::new);
                reply.setRating(rating);
                replies.add(reply);
            }
            return replies;
        }
    }
}
