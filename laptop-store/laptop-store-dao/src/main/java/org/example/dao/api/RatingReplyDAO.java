package org.example.dao.api;

import org.example.model.RatingReply;

import javax.ejb.Local;
import java.util.List;

@Local
public interface RatingReplyDAO {
    void save(RatingReply ratingReply);

    List<RatingReply> findByRatingIds(List<Integer> ratingIds);
}
