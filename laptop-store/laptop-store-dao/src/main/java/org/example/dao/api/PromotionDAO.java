package org.example.dao.api;

import org.example.model.Promotion;

import javax.ejb.Local;
import java.util.List;

@Local
public interface PromotionDAO {
    List<Promotion> findByPages(Integer page);
}