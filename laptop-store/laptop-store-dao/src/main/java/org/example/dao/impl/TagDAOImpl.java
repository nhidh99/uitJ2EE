package org.example.dao.impl;

import org.example.dao.api.TagDAO;
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
import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Stateless
@LocalBean
public class TagDAOImpl implements TagDAO {

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Resource(name = "jdbc/laptop-store")
    private DataSource ds;

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findAll() {
        String query = "SELECT t.id, t.name FROM tag t";
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Tag> tags = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Tag tag = Tag.fromResultSet(rs);
                tags.add(tag);
            }
            return tags;
        } catch (SQLException sqlException) {
            return new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findByIds(List<Integer> ids) {
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
        String query = String.format("SELECT id, name FROM Tag t WHERE t.id IN (%s)", idsFormatted);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Tag> tags = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Tag tag = Tag.fromResultSet(rs);
                tags.add(tag);
            }
            return tags;
        } catch (SQLException sqlException) {
            return new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public List<Tag> findByLaptopId(Integer laptopId) {
        String query = String.format("SELECT t.id, t.name FROM laptop l " +
                "INNER JOIN laptop_tag lt INNER JOIN tag t " +
                "ON l.id = lt.laptop_id WHERE l.id = %s AND lt.tag_id = t.id", laptopId);
        List<Tag> tags = new LinkedList<>();
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                 Tag tag = Tag.fromResultSet(rs);
                 tags.add(tag);
            }
            return tags;
        } catch (SQLException sqlException) {
            return new LinkedList<>();
        }
    }

    @Override
    @Transactional(Transactional.TxType.SUPPORTS)
    public Optional<Tag> findById(Integer id) {
        String query = String.format("SELECT id, name FROM tag t WHERE t.id = %s", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            Tag tag = null;
            while (rs.next()) {
                tag = Tag.fromResultSet(rs);
            }
            return Optional.ofNullable(tag);
        } catch (SQLException sqlException) {
            return Optional.ofNullable(new Tag());
        }
    }
}