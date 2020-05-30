package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.type.RAMType;

import javax.persistence.*;

@Data
@Entity
@Table(name = "ram")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RAM {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="size")
    @JsonProperty("size")
    private Integer size;

    @Column(name = "type")
    @JsonProperty("type")
    @Enumerated(EnumType.STRING)
    private RAMType type;

    @Column(name="bus")
    @JsonProperty("bus")
    private Integer bus;

    @Column(name="extra_slot")
    @JsonProperty("extra_slot")
    private Integer extraSlot;

//    @OneToOne(mappedBy = "ram", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private Laptop laptop;
}
