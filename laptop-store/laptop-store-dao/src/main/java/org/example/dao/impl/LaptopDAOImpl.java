package org.example.dao.impl;

import org.example.dao.api.LaptopDAO;
import org.example.filter.SearchFilter;
import org.example.model.*;

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
public class LaptopDAOImpl implements LaptopDAO {
    private static final Integer ELEMENT_PER_BLOCK = 8;
    private static final Integer ADMIN_ELEMENT_PER_BLOCK = 5;
    private static final Integer ELEMENT_PER_SUGGEST = 5;

    @PersistenceContext(name = "laptop-store")
    private EntityManager em;

    @Resource(name = "jdbc/laptop-store-jdbc")
    private DataSource ds;

    @Override
    public void save(Laptop laptop) {
        if (laptop.getId() == null) {
            insert(laptop);
        } else {
            update(laptop);
        }
    }

    private int insertCPU(Laptop laptop) {
        String query = String.format("INSERT INTO cpu VALUES(%s, '%s', '%s', '%s', '%s'"
                    , 0, laptop.getCpu().getType(), laptop.getCpu().getDetail()
                    , laptop.getCpu().getSpeed(), laptop.getCpu().getMaxSpeed());
        String getLastestCpu = "SELECT id FROM cpu ORDER BY id DESC LIMIT 1";
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return rs.getInt("id");
            }
            return -1;
        }
        catch (SQLException sqlException) {
            return -1;
        }
    }

    private int insertRAM(Laptop laptop) {
        String query = String.format("INSERT INTO ram VALUES(%s, '%s', '%s', '%s', '%s'"
                , 0, laptop.getRam().getSize(), laptop.getRam().getType()
                , laptop.getRam().getBus(), laptop.getRam().getExtraSlot());
        String getLastestCpu = "SELECT id FROM ram ORDER BY id DESC LIMIT 1";
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return rs.getInt("id");
            }
            return -1;
        }
        catch (SQLException sqlException) {
            return -1;
        }
    }

    private int insertMonitor(Laptop laptop) {
        String query = String.format("INSERT INTO monitor VALUES(%s, '%s', '%s', '%s', '%s'"
                , 0, laptop.getMonitor().getSize(), laptop.getMonitor().getResolutionType()
                , laptop.getMonitor().getResolutionWidth(), laptop.getMonitor().getResolutionHeight());
        String getLastestCpu = "SELECT id FROM monitor ORDER BY id DESC LIMIT 1";
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return rs.getInt("id");
            }
            return -1;
        }
        catch (SQLException sqlException) {
            return -1;
        }
    }

    private int insertHardDrive(Laptop laptop) {
        String query = String.format("INSERT INTO hard_drive VALUES(%s, '%s', '%s', '%s'"
                , 0, laptop.getHardDrive().getType()
                , laptop.getHardDrive().getSize(), laptop.getHardDrive().getDetail());
        String getLastestCpu = "SELECT id FROM hard_drive ORDER BY id DESC LIMIT 1";
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return rs.getInt("id");
            }
            return -1;
        }
        catch (SQLException sqlException) {
            return -1;
        }
    }

    private void updateCPU(Laptop laptop) {
        String query = String.format("UPDATE cpu SET type = '%s',detail = '%s'" +
                        ", speed = '%s', max_speed = '%s' WHERE id = %s"
                , laptop.getCpu().getType(), laptop.getCpu().getDetail()
                , laptop.getCpu().getSpeed(), laptop.getCpu().getMaxSpeed(), laptop.getCpu().getId());
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    private void updateRAM(Laptop laptop) {
        String query = String.format("UPDATE ram SET size = '%s', type = '%s'" +
                        ", bus = '%s', extra_slot = '%s' WHERE id = %s"
                , laptop.getRam().getSize(), laptop.getRam().getType()
                , laptop.getRam().getBus(), laptop.getRam().getExtraSlot(), laptop.getRam().getId());
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    private void updateMonitor(Laptop laptop) {
        String query = String.format("UPDATE monitor SET size = '%s', type = '%s'" +
                        ", resolution_width = '%s', resolution_height = '%s' WHERE id = %s"
                , laptop.getMonitor().getSize(), laptop.getMonitor().getResolutionType()
                , laptop.getMonitor().getResolutionWidth(), laptop.getMonitor().getResolutionHeight(), laptop.getMonitor().getId());
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    private void updateHardDrive(Laptop laptop) {
        String query = String.format("UPDATE hard_drive SET type = '%s', size = '%s'" +
                        ", detail = '%s' WHERE id = %s"
                , laptop.getHardDrive().getType()
                , laptop.getHardDrive().getSize(), laptop.getHardDrive().getDetail(), laptop.getHardDrive().getId());
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            statement.execute(query);
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }


    private void insert(Laptop laptop) {
        laptop.setAvgRating(5.0f);
        em.merge(laptop);
    }

    private void update(Laptop laptop) {
        Laptop oldLaptop = findById(laptop.getId()).orElseThrow(BadRequestException::new);
        if (laptop.getImage() == null) {
            laptop.setImage(oldLaptop.getImage());
            laptop.setThumbnail(oldLaptop.getThumbnail());
        }
        laptop.setAvgRating(oldLaptop.getAvgRating());
        String query = "";
        boolean imageChanged = false;
        boolean thumbnailChange = false;
        List<Tag> tags = laptop.getTags();
        List<Promotion> promotions = laptop.getPromotions();
        if(laptop.getImage() != null) {
            if(laptop.getThumbnail()!=null) {
                query = String.format(
                "UPDATE laptop SET name = '%s', brand = '%s', unit_price = '%s', discount_price = '%s', " +
                        "quantity = '%s', avg_rating = '%s', alt = '%s', graphics_card = '%s', " +
                        "ports = '%s', os = '%s', design = '%s', thickness = '%s', weight = '%s', " +
                        "image = ?, thumbnail = ? " +
                        "WHERE id = '%s'", laptop.getName(), laptop.getBrand(),
                    laptop.getUnitPrice(), laptop.getDiscountPrice(), laptop.getQuantity(),
                        laptop.getAvgRating(), laptop.getAlt(), laptop.getGraphisCard(),
                        laptop.getPorts(), laptop.getOs(), laptop.getDesign(), laptop.getThickness(),
                        laptop.getWeight(), laptop.getId());
                thumbnailChange = true;
            }
            else {
                query = String.format(
                "UPDATE laptop SET name = '%s', brand = '%s', unit_price = '%s', discount_price = '%s', " +
                        "quantity = '%s', avg_rating = '%s', alt = '%s', graphics_card = '%s', " +
                        "ports = '%s', os = '%s', design = '%s', thickness = '%s', weight = '%s', " +
                        "image = ? " +
                        "WHERE id = '%s'", laptop.getName(), laptop.getBrand(),
                    laptop.getUnitPrice(), laptop.getDiscountPrice(), laptop.getQuantity(),
                        laptop.getAvgRating(), laptop.getAlt(), laptop.getGraphisCard(),
                        laptop.getPorts(), laptop.getOs(), laptop.getDesign(), laptop.getThickness(),
                        laptop.getWeight(), laptop.getId());
            }
            imageChanged = true;
        }
        else  {
            query = String.format(
                    "UPDATE laptop SET name = '%s', brand = '%s', unit_price = '%s', discount_price = '%s', " +
                            "quantity = '%s', avg_rating = '%s', alt = '%s', graphics_card = '%s', " +
                            "ports = '%s', os = '%s', design = '%s', thickness = '%s', weight = '%s' " +
                            "WHERE id = '%s'", laptop.getName(), laptop.getBrand(),
                    laptop.getUnitPrice(), laptop.getDiscountPrice(), laptop.getQuantity(),
                    laptop.getAvgRating(), laptop.getAlt(), laptop.getGraphisCard(),
                    laptop.getPorts(), laptop.getOs(), laptop.getDesign(), laptop.getThickness(),
                    laptop.getWeight(), laptop.getId());
        }
        updateCPU(laptop);
        updateRAM(laptop);
        updateHardDrive(laptop);
        updateMonitor(laptop);
        try (Connection conn = ds.getConnection(); PreparedStatement pstm = conn.prepareStatement(query); Statement statement = conn.createStatement()) {
            if(imageChanged) {
                pstm.setBytes(1, laptop.getImage());
                if(thumbnailChange) {
                    pstm.setBytes(2, laptop.getThumbnail());
                }
            }
            pstm.execute();
            query = String.format("DELETE laptop_tag WHERE laptop_id = %s", laptop.getId());
            statement.execute(query);
            query = String.format("DELETE laptop_promotion WHERE laptop_id = %s", laptop.getId());
            for(Tag tag: tags) {
                query = String.format("INSERT INTO laptop_tag VALUES(%s, %s)"
                        , laptop.getId(), tag.getId());
                statement.execute(query);
            }
            for (Promotion p: promotions) {
                query = String.format("INSERT INTO laptop_ptomotion VALUES(%s, %s)"
                        , laptop.getId(), p.getId());
                statement.execute(query);
            }
            return;
        }
        catch (SQLException sqlException) {
            return;
        }
    }

    @Override
    public List<Laptop> findByPage(Integer page) {
        String query = String.format("SELECT * FROM laptop l " +
                        "WHERE l.record_status = true ORDER BY l.id DESC LIMIT %s, %s"
                , ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            LinkedList<Laptop> laptops = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Laptop laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
                laptops.add(laptop);
            }
            return laptops;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    public void delete(Integer id) {
        String selectPromotion = String.format("SELECT id FROM promotion where id = %s", id);
        String query = String.format("UPDATE laptop l SET record_status = 0 WHERE id = %s", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(selectPromotion);
            if(rs.next()) {
                statement.executeQuery(query);
            }
            else {
                throw new BadRequestException();
            }
        }
        catch (SQLException sqlException) {

        }
    }

    @Override
    public Optional<Laptop> findById(Integer id) {
        String query = String.format("SELECT * FROM laptop l " +
                "WHERE l.id = %s ", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            Laptop laptop = null;
            while (rs.next()) {
                laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
            }
            return Optional.of(laptop);
        } catch (SQLException sqlException) {
            return Optional.of(new Laptop());
        }
    }

    @Override
    public List<Laptop> findByCondition(SearchFilter filter) {
        String query = String.format("SELECT * FROM laptop l WHERE l.record_status = true LIMIT %s, %s"
        , ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);

        if (filter.getBrand() != null && !filter.getBrand().equals("")) {
            query = String.format("SELECT * FROM laptop l " +
                            "WHERE l.brand = '%s' AND l.record_status = true LIMIT %s, %s"
                    , filter.getBrand(), ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);
        }

        if (filter.getCpu() != null && !filter.getCpu().equals("")) {

            query = String.format("SELECT l.* FROM laptop l INNER JOIN cpu c " +
                            "ON l.cpu_id = c.id WHERE c.type = '%s' AND l.record_status = true LIMIT %s, %s"
                    , filter.getCpu(), ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);
        }

        if (filter.getHardDrive() != null) {
            query = String.format("SELECT l.* FROM laptop l INNER JOIN hard_drive hd ON hd.id = l.hard_drive_id " +
                    "WHERE hd.size >= " + filter.getHardDrive() + " AND l.record_status = true " +
                    "ORDER BY hd.size ASC LIMIT %s, %s"
                    , ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);
        }

        if (filter.getMonitor() != null) {
            query = String.format("SELECT l.* FROM laptop l INNER JOIN monitor m ON m.id = l.monitor_id " +
                    "WHERE m.size >= " + filter.getMonitor() + " AND l.record_status = true " +
                    "ORDER BY m.size ASC LIMIT %s, %s"
                    , ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);
        }

        if (filter.getPrice() != null) {
            query = String.format("SELECT l.* FROM laptop l " +
                    "WHERE l.unit_price >= " + filter.getPrice() + " AND l.record_status = true " +
                    "ORDER BY l.unit_price ASC LIMIT %s, %s"
                    , ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);
        }

        if (filter.getRam() != null) {
            query = String.format("SELECT l.* FROM laptop l INNER JOIN ram r ON r.id = l.ram_id " +
                    "WHERE r.size >= " + filter.getRam() +
                    " AND l.record_status = true ORDER BY r.size ASC LIMIT %s, %s"
                    , ELEMENT_PER_BLOCK * (filter.getPage() - 1), ELEMENT_PER_BLOCK);
        }

        if (filter.getDemand() != null && !filter.getDemand().equals("")) {
            query = String.format("SELECT l.* FROM laptop l JOIN laptop_tag lt JOIN tag t " +
                    "ON lt.laptop_id = l.id AND t.id = lt.tag_id " +
                    "WHERE t.name = '" + filter.getDemand() + "'");
        }

        if (filter.getName() != null && !filter.getName().equals("")) {
            query = String.format("SELECT l.* FROM laptop l WHERE l.name LIKE concat('%','" + filter.getName() + "','%')");
        }

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Laptop> laptops = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Laptop laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
                laptops.add(laptop);
            }
            return  laptops;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    public List<Laptop> findByFilter(String filter, Integer page) {
        String query = String.format("SELECT * FROM laptop l " +
                        "WHERE l.id = '%s' OR l.name LIKE CONCAT('%','%s','%') " +
                        "AND p.record_status = true " +
                        "ORDER BY p.id DESC LIMIT %s, %s"
                , filter, filter, ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Laptop> laptops = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Laptop laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
                laptops.add(laptop);
            }
            return  laptops;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    public Long findTotalLaptops(String filter) {
        String query = "";
        if (filter == null) {
            query = "SELECT COUNT(l) as counts FROM laptop l WHERE l.recordStatus = true";
        } else {
            query = String.format("SELECT COUNT(*) AS count_laptop FROM laptop l WHERE l.id = '%s' " +
                    "OR l.name LIKE CONCAT('%','%s','%') AND l.record_status = true"
                    , filter, filter);
        }
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                return Long.parseLong(rs.getString("count_laptop"));
            }
            return 0l;
        }
        catch (SQLException sqlException) {
            return  0l;
        }
    }

    @Override
    public List<Laptop> findByType(String type, Integer page) {
        String query = "";
        switch (type) {
            case "new": {
                query = String.format("SELECT * FROM laptop l WHERE l.record_status = true " +
                        "ORDER BY l.id DESC LIMIT %s, %s"
                        , ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);
                break;
            }
            case "cheap": {
                query = String.format("SELECT * FROM laptop l WHERE l.record_status = true " +
                        "ORDER BY l.unit_price ASC LIMIT %s, %s"
                        , ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);
                break;
            }
            case "top-selling": {
                query = String.format("SELECT * FROM laptop l JOIN order_detail od ON l.id = od.product_id " +
                        "WHERE l.record_status = true GROUP BY l.id ORDER BY COUNT(od.product_id) DESC LIMIT %s, %s"
                        , ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);
                break;
            }
            case "common":
            default:
                query = String.format("SELECT * FROM laptop l WHERE l.record_status = true LIMIT %s, %s"
                        , ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);
        }
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Laptop> laptops = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Laptop laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
                laptops.add(laptop);
            }
            return  laptops;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    public List<Laptop> findByIds(List<Integer> ids) {
        if (ids.isEmpty()) return new ArrayList<>();
        String idsFormatted = "";
        for(int i = 0 ; i< ids.size(); i++) {
            if(i == ids.size() - 1) {
                idsFormatted += String.format("%s", ids.get(i));
            }
            else {
                idsFormatted += String.format("%s, ", ids.get(i));
            }
        }
        String query = String.format("SELECT * FROM laptop l WHERE " +
                        "l.id IN (%s) AND l.record_status = true",
                idsFormatted);

        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            List<Laptop> laptops = new LinkedList<>();
            ResultSet rs = statement.executeQuery(query);
            while (rs.next()) {
                Laptop laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
                laptops.add(laptop);
            }
            return laptops;
        }
        catch (SQLException sqlException) {
            return  new LinkedList<>();
        }
    }

    @Override
    public List<Laptop> findByName(String name, Integer page) {
        String query = String.format("SELECT * FROM laptop l WHERE l.record_status = true " +
                "AND l.name LIKE CONCAT('%','%s','%') LIMIT %s, %s"
                , name, ELEMENT_PER_BLOCK * (page - 1), ELEMENT_PER_BLOCK);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            LinkedList<Laptop> laptops = new LinkedList<>();
            while (rs.next()) {
                Laptop laptop = Laptop.fromResultSet(rs);
                laptop.setCpu(getCPUById(rs.getInt("cpu_id")));
                laptop.setRam(getRAMById(rs.getInt("ram_id")));
                laptop.setHardDrive(getHardDriveById(rs.getInt("hard_drive_id")));
                laptop.setMonitor(getMonitorById(rs.getInt("monitor_id")));
                laptop.setRecordStatus(rs.getBoolean("record_status"));
                laptops.add(laptop);
            }
            return laptops;
        } catch (SQLException sqlException) {
            return  new LinkedList<>();
        }

    }

    @Override
    public byte[] findImageById(Integer id) {
        String query = String.format("SELECT image FROM laptop l WHERE l.id = %s ", id);
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

    @Override
    public byte[] findThumbnailById(Integer id) {
        String query = String.format("SELECT thumbnail FROM laptop l WHERE l.id = %s ", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            ResultSet rs = statement.executeQuery(query);
            byte []image = null;
            while (rs.next()) {
                Blob blob = rs.getBlob("thumbnail");
                int blobLength = (int) blob.length();
                image = blob.getBytes(1, blobLength);
            }
            return  image;
        } catch (SQLException sqlException) {
            return null;
        }
    }

    @Override
    public List<Laptop> findSuggestionsByLaptop(Integer laptopId) {
        String query = "CALL laptop_suggest(?, ?)";
        return em.createNativeQuery(query, Laptop.class)
                .setParameter(1, laptopId)
                .setParameter(2, ELEMENT_PER_SUGGEST)
                .getResultList();
    }

    private CPU getCPUById(int id) {
        String query = String.format("SELECT * FROM cpu WHERE id = '%s'", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            CPU  cpu = null;
            ResultSet rs = statement.executeQuery(query);
            while(rs.next()) {
                cpu = CPU.fromResultSet(rs);
            }
            return cpu;
        }
        catch (SQLException sqlException) {
            return  null;
        }
    }

    private RAM getRAMById(int id) {
        String query = String.format("SELECT * FROM ram WHERE id = '%s'", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            RAM  ram = null;
            ResultSet rs = statement.executeQuery(query);
            while(rs.next()) {
                ram = RAM.fromResultSet(rs);
            }
            return ram;
        }
        catch (SQLException sqlException) {
            return  null;
        }
    }

    private Monitor getMonitorById(int id) {
        String query = String.format("SELECT * FROM monitor WHERE id = '%s'", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            Monitor  monitor = null;
            ResultSet rs = statement.executeQuery(query);
            while(rs.next()) {
                monitor = Monitor.fromResultSet(rs);
            }
            return monitor;
        }
        catch (SQLException sqlException) {
            return  null;
        }
    }

    private HardDrive getHardDriveById(int id) {
        String query = String.format("SELECT * FROM hard_drive WHERE id = '%s'", id);
        try (Connection conn = ds.getConnection(); Statement statement = conn.createStatement()) {
            HardDrive  hardDrive = null;
            ResultSet rs = statement.executeQuery(query);
            while(rs.next()) {
                hardDrive = HardDrive.fromResultSet(rs);
            }
            return hardDrive;
        }
        catch (SQLException sqlException) {
            return  null;
        }
    }
}
