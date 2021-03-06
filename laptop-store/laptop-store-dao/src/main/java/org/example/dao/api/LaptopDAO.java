package org.example.dao.api;

import org.example.filter.SearchFilter;
import org.example.model.Laptop;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface LaptopDAO {
    void save(Laptop laptop);

    void delete(Integer id);

    List<Laptop> findByPage(Integer page);

    Long findTotalLaptops(String filter);

    List<Laptop> findByIds(List<Integer> ids);

    Optional<Laptop> findById(Integer id);

    List<Laptop> findByFilter(String filter, Integer page);

    List<Laptop> findByCondition(SearchFilter filter);

    List<Laptop> findByType(String type, Integer page);

    List<Laptop> findByName(String name, Integer page);

    byte[] findImageById(Integer id);

    byte[] findThumbnailById(Integer id);

    List<Laptop> findSuggestionsByLaptop(Integer laptopId);
}