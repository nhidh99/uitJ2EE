package org.example.dao.impl;

import org.example.dao.api.AddressDAO;
import org.example.model.Address;
import org.example.model.Tag;
import org.example.model.User;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class AddressDAOImpl implements AddressDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Address> findById(Integer id) {
        String query = String.format("SELECT * FROM address WHERE id = %s", id);
        Address address = null;
        Integer userId = 0;
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                userId = rs.getInt("user_id");
                address = Address.fromResultSet(rs);
            }
            String select_user = "SELECT * from user u WHERE u.id = " + userId;
            ResultSet rsuser = statement.executeQuery(select_user);
            User u = null;
            while(rsuser.next()) {
                u = User.fromResultSet(rsuser);
            }
            address.setUser(u);
            return Optional.ofNullable(address);
        } catch (SQLException sqlException) {
            return Optional.ofNullable(new Address());
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Address> findByUserId(Integer userId) {
        String query = String.format("SELECT a.* FROM address a INNER JOIN user u " +
                "ON a.user_id = u.id WHERE u.id = %s", userId);
        List<Address> addresses = new LinkedList<>();
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while(rs.next()) {
                Address address = Address.fromResultSet(rs);
                addresses.add(address);
            }
            return addresses;

        } catch (SQLException sqlException) {
            return addresses;
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Address address) {
        if (address.getId() == null) {
            insert(address);
        } else {
            update(address);
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Address address = em.find(Address.class, id);
        if (address == null) throw new BadRequestException();
        String query = String.format("UPDATE address SET record_status = 0 WHERE id = %s", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.executeQuery(query);
        }
        catch (SQLException sqlException) {

        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void insert(Address address) {
        String query = String.format(
                "INSERT INTO address VALUES(%s, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', %s)",
                0,address.getAddressNum(), address.getStreet(), address.getWard()
                , address.getDistrict(), address.getCity(), address.getReceiverName()
                , address.getReceiverPhone(), address.getUser().getId(), "1");
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
        }
        catch (SQLException sqlException) {
            int a=1;
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void update(Address address) {

        String query = String.format(
                "UPDATE address SET address_num = '%s', street = '%s', ward = '%s'" +
                        ", district = '%s', city = '%s'" +
                        ", receiver_name = '%s', receiver_phone = '%s'" +
                        " WHERE id = %s"
                ,address.getAddressNum(), address.getStreet(), address.getWard()
                , address.getDistrict(), address.getCity(), address.getReceiverName()
                , address.getReceiverPhone(), address.getId());
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.executeQuery(query);
        }
        catch (SQLException sqlException) {

        }
    }

}
