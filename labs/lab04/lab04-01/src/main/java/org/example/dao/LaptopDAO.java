package org.example.dao;

import org.example.model.Laptop;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class LaptopDAO {

    public List<Laptop> findAll() {
        try (Connection conn = DBUtil.getConnection()) {
            String query = "SELECT * FROM laptop";
            Statement stm = conn.createStatement();
            ResultSet rs = stm.executeQuery(query);
            List<Laptop> laptops = new LinkedList<>();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                long price = rs.getLong("price");
                laptops.add(new Laptop(id, name, price));
            }
            return laptops;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}