package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.CPUType;
import org.example.type.GenderType;
import org.example.type.RoleType;

import javax.persistence.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "cpu")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CPU {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type")
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private CPUType type;

    @Column(name = "detail")
    @JsonProperty("detail")
    private String detail;

    @Column(name = "speed")
    @JsonProperty("speed")
    private Float speed;

    @Column(name = "max_speed")
    @JsonProperty("max_speed")
    private Float maxSpeed;

    public static CPU fromResultSet(ResultSet rs) throws SQLException {
        return CPU.builder()
                .id(rs.getInt("id"))
                .type(CPUType.valueOf(rs.getString("type")))
                .detail(rs.getString("detail"))
                .speed(rs.getFloat("speed"))
                .maxSpeed(rs.getFloat("max_speed"))
                .build();
    }
}

