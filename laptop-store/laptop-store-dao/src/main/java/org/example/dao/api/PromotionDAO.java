package org.example.dao.api;

import org.example.model.Promotion;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface PromotionDAO {
    List<Promotion> findAll();

    List<Promotion> findByPage(Integer page);

    List<Promotion> findByIds(List<Integer> ids);

    List<Promotion> findByLaptopId(Integer laptopId);

    Long findTotalPromotions();

    Optional<Promotion> findById(Integer id);

    void save(Promotion promotion);

    void delete(Integer id);

    byte[] findImageById(Integer id);
}