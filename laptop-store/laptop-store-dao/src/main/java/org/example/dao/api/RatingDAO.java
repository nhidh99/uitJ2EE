package org.example.dao.api;

import org.example.model.Rating;

import javax.ejb.Local;
import java.util.List;

@Local
public interface RatingDAO {
    void save(Rating rating);

    List<Rating> findByProductId(Integer userId, Integer laptopId);

    Float findAvgRatingByProductId(Integer laptopId);
}
