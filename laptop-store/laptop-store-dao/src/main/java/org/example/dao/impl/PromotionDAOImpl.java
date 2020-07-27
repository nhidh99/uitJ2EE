package org.example.dao.impl;

import org.example.dao.api.PromotionDAO;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.model.Tag;

import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.DataSource;
import javax.transaction.Transactional;
import javax.ws.rs.BadRequestException;
import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Stateless
@LocalBean
public class PromotionDAOImpl implements PromotionDAO {
    private static final Integer ELEMENT_PER_BLOCK = 5;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findAll() {
        String query = "SELECT * " +
                "FROM promotion p " +
                "WHERE p.record_status = true " +
                "ORDER BY p.id DESC";

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Promotion> promotions = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Promotion promotion = Promotion.fromResultSet(rs);
                promotions.add(promotion);
            }
            return promotions;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByPage(Integer page){
        String query = String.format("SELECT * FROM promotion p " +
                        "WHERE p.record_status = true ORDER BY p.id DESC LIMIT %s, %s"
                        , ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Promotion> promotions = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Promotion promotion = Promotion.fromResultSet(rs);
                promotions.add(promotion);
            }
            return promotions;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByIds(List<Integer> ids){
        if (ids.isEmpty()) return new LinkedList<>();
        String idsFormatted = "";
        for(int i = 0 ; i< ids.size(); i++) {
            if(i == ids.size() - 1) {
                idsFormatted += String.format("%s", ids.get(i));
            }
            else {
                idsFormatted += String.format("%s, ", ids.get(i));
            }
        }
        String query = String.format("SELECT * FROM promotion p WHERE " +
                                    "p.id IN (%s) AND p.record_status = true",
                                    idsFormatted);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Promotion> promotions = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Promotion promotion = Promotion.fromResultSet(rs);
                promotions.add(promotion);
            }
            return promotions;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByFilter(String filter, Integer page) {
        String query = String.format("SELECT * FROM promotion p " +
                "WHERE p.id = %s OR p.name LIKE CONCAT('%',%s,'%') LIMIT %s, %s" +
                "AND p.record_status = true "
                , filter, filter, ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Promotion> promotions = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Promotion promotion = Promotion.fromResultSet(rs);
                promotions.add(promotion);
            }
            return promotions;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Long findTotalPromotions(String filter) {
        String query = "";
        if (filter == null) {
            query = String.format("SELECT COUNT(id) AS count_promotion FROM promotion p " +
                    "WHERE p.record_status = true");
        } else {
            query = String.format("SELECT COUNT(id) AS count_promotion FROM promotion p " +
                    "WHERE p.id = %s OR p.name LIKE CONCAT('%',%s,'%') AND p.record_status = true"
                , filter, filter);
        }
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Promotion> promotions = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return Long.parseLong(rs.getString("count_promotion"));
            }
            return 0l;
        }
        catch (SQLException sqlException) {
            return  0l;
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void save(Promotion promotion) {
        if (promotion.getId() == null) {
            insert(promotion);
        } else {
            update(promotion);
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void insert(Promotion promotion) {
        String query = String.format("INSERT INTO promotion VALUES(0, '%s', '%s', '%s', '%s', ?, '1')",
                promotion.getName(), promotion.getPrice(), promotion.getQuantity()
                , promotion.getAlt());

        try (Connection conn = ds.getConnection(); PreparedStatement pstm = conn.prepareStatement(query)) {
            pstm.setBytes(1, findImageById(promotion.getId()));
            pstm.execute();
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    @Transactional(Transactional.TxType.REQUIRED)
    private void update(Promotion promotion) {
        String query = "";
        boolean imageChanged = false;
        if(promotion.getImage() != null) {
            query = String.format("UPDATE promotion SET name = '%s', price = '%s', quantity = '%s', alt = '%s', image = ? WHERE id = '%s'",
                    promotion.getName(), promotion.getPrice(), promotion.getQuantity()
                    , promotion.getAlt(), promotion.getId());
            imageChanged = true;
        }
        else  {
            query = String.format("UPDATE promotion SET name = '%s', price = '%s', quantity = '%s', alt = '%s' WHERE id = '%s'",
                    promotion.getName(), promotion.getPrice(), promotion.getQuantity()
                    , promotion.getAlt(), promotion.getId());
        }

        try (Connection conn = ds.getConnection(); PreparedStatement pstm = conn.prepareStatement(query)) {
            if(imageChanged) {
                pstm.setBytes(1, promotion.getImage());
            }
            pstm.execute();
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    @Override
    @Transactional(Transactional.TxType.REQUIRES_NEW)
    public void delete(Integer id) {
        Promotion promotion = em.find(Promotion.class, id);
        if (promotion == null) throw new BadRequestException();
        String query = String.format("UPDATE promotion p SET record_status = 0 WHERE id = %s", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.executeQuery(query);
        }
        catch (SQLException sqlException) {

        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Promotion> findById(Integer id) {
        String query = String.format("SELECT * FROM promotion p " +
                "WHERE p.id = %s ", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            Promotion promotion = null;
            while (rs.next()) {
                promotion = Promotion.fromResultSet(rs);
            }
            return Optional.ofNullable(promotion);
        } catch (SQLException sqlException) {
            return Optional.ofNullable(new Promotion());
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Promotion> findByLaptopId(Integer laptopId) {
        String query = String.format("select p.* from promotion p " +
                "inner join laptop_promotion lp inner join laptop l " +
                "on lp.promotion_id = p.id and l.id = lp.laptop_id and l.id = %s"
                , laptopId);
        List<Promotion> promotions = new LinkedList<>();
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Promotion promotion = Promotion.fromResultSet(rs);
                promotions.add(promotion);
            }
            return promotions;
        } catch (SQLException sqlException) {
            return promotions;
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public byte[] findImageById(Integer id) {
        String query = String.format("SELECT image FROM promotion p WHERE p.id = %s ", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            byte []image = null;
            while (rs.next()) {
                Blob blob = rs.getBlob("image");

                int blobLength = (int) blob.length();
                image = blob.getBytes(1, blobLength);
            }
            return  image;
        } catch (SQLException sqlException) {
            return null;
        }
    }
}