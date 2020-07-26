package org.example.dao.api;

import org.example.model.RatingReply;

import javax.ejb.Local;
import java.sql.SQLException;
import java.util.List;

@Local
public interface RatingReplyDAO {
    void save(RatingReply ratingReply) throws SQLException;
    List<RatingReply> findByRatingId(Integer ratingId) throws SQLException;
}
