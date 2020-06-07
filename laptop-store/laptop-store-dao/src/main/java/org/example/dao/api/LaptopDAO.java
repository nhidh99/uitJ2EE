package org.example.dao.api;

import org.example.model.Filter;
import org.example.model.Laptop;

import javax.ejb.Local;
import java.util.List;
import java.util.Optional;

@Local
public interface LaptopDAO {
    void save(Laptop laptop);

    void delete(Integer id);

    List<Laptop> findByPage(Integer page);

    Long findTotalLaptops();

    List<Laptop> findByIds(List<Integer> ids);

    Optional<Laptop> findById(Integer id);

    List<Laptop> findByCondition(Filter filter);

    List<Laptop> findByType(String type, Integer page);

    List<Laptop> findByName(String name, Integer page);

    byte[] findImageById(Integer id);

    byte[] findThumbnailById(Integer id);
}