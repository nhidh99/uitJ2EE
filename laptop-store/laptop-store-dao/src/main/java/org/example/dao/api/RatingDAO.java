package org.example.dao.api;

import org.example.model.Rating;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface RatingDAO {
    void save(Rating rating);

    Optional<Rating> findById(Integer id);

    List<Rating> findByProductId(Integer laptopId);

    List<Rating> findByFilter(String id, String status, Integer page);

    Long findTotalRatingByFilter(String id, String status);

    Long findTotalRatingByProductId(Integer laptopId);

    List<Rating> findByPage(Integer page);

    void delete(Integer id);

    void approve(Integer id);

    void deny(Integer id);
}