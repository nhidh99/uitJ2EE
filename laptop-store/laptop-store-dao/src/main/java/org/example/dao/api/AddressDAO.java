package org.example.dao.api;

import org.example.model.Address;

import javax.ejb.Local;
import java.util.List;

@Local
public interface AddressDAO {
    List<Address> findByUserId(Integer userId);

    void save(Address address);

    void delete(Integer id);
}
