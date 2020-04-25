package org.example.dao.api;

import org.example.model.Promotion;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface PromotionDAO {
    List<Promotion> findByPages(Integer page);
    Optional<Promotion> findById(Integer id);
    void save(Promotion promotion);
    byte[] findImageById(Integer id);
}