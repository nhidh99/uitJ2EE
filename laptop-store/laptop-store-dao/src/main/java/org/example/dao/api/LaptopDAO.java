package org.example.dao.api;

import org.example.model.Laptop;

import javax.ejb.Local;
import java.util.List;

@Local
public interface LaptopDAO {
    void save(Laptop laptop);
    List<Laptop> findByPage(Integer page);
}
