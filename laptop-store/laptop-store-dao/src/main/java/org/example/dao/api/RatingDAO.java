package org.example.dao.api;

import org.example.model.Rating;

import javax.ejb.Local;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Local
public interface RatingDAO {
    void save(Rating rating) throws SQLException;

    Optional<Rating> findById(Integer id) throws SQLException;

    List<Rating> findByProductId(Integer laptopId) throws SQLException;

    List<Rating> findByFilter(String id, String status, Integer page) throws SQLException;

    Long findTotalRatingByFilter(String id, String status) throws SQLException;

    Long findTotalRatingByProductId(Integer laptopId) throws SQLException;

    List<Rating> findByPage(Integer page) throws SQLException;

    void delete(Integer id) throws SQLException;

    void approve(Integer id) throws SQLException;

    void deny(Integer id) throws SQLException;
}