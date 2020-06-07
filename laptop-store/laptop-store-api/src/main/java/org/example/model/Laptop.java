package org.example.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.BrandType;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "laptop")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Laptop {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "brand")
    @JsonProperty("brand")
//    @Enumerated(EnumType.STRING)
    @Convert(converter = BrandType.BrandConverter.class)
    private BrandType brand;

    @Column(name = "unit_price")
    @JsonProperty("unit_price")
    private Long unitPrice;

    @Column(name = "discount_price")
    @JsonProperty("discount_price")
    private Long discountPrice;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Column(name = "alt")
    @JsonProperty("alt")
    private String alt;

    @Column(name = "avg_rating")
    @JsonProperty("avg_rating")
    private Float avgRating;

    @Column(name = "graphics_card")
    @JsonProperty("graphics_card")
    private String graphisCard;

    @Column(name = "ports")
    @JsonProperty("ports")
    private String ports;

    @Column(name = "os")
    @JsonProperty("os")
    private String os;

    @Column(name = "design")
    @JsonProperty("design")
    private String design;

    @Column(name = "thickness")
    @JsonProperty("thickness")
    private Float thickness;

    @Column(name = "weight")
    @JsonProperty("weight")
    private Float weight;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cpu_id")
    @JsonProperty("cpu")
    private CPU cpu;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ram_id")
    @JsonProperty("ram")
    private RAM ram;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "hard_drive_id")
    @JsonProperty("hard_drive")
    private HardDrive hardDrive;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "monitor_id")
    @JsonProperty("monitor")
    private Monitor monitor;

    @Lob
    @Column(name = "image")
    @JsonIgnore
    @Basic(fetch = FetchType.LAZY)
    private byte[] image;

    @Lob
    @Column(name = "thumbnail")
    @JsonIgnore
    @Basic(fetch = FetchType.LAZY)
    private byte[] thumbnail;

    @Column(name = "record_status")
    @JsonIgnore
    private boolean recordStatus;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "laptop_tag",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    @ToString.Exclude
    @JsonIgnore
    private List<Tag> tags;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinTable(name = "laptop_promotion",
            joinColumns = @JoinColumn(name = "laptop_id"),
            inverseJoinColumns = @JoinColumn(name = "promotion_id"))
    @ToString.Exclude
    @JsonIgnore
    private List<Promotion> promotions;
}