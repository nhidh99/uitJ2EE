package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.CPUType;

import javax.persistence.*;

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
}

