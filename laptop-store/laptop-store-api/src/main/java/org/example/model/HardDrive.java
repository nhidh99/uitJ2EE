package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.HardDriveType;

import javax.persistence.*;

@Data
@Entity
@Table(name = "hard_drive")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HardDrive {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type")
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private HardDriveType type;

    @Column(name = "size")
    @JsonProperty("size")
    private Integer size;

    @Column(name = "detail")
    @JsonProperty("detail")
    private String detail;
}
