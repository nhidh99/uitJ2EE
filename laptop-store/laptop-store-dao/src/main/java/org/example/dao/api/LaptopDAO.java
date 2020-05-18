package org.example.dao.api;

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

    byte[] findImageById(Integer id);

    byte[] findThumbnailById(Integer id);
}