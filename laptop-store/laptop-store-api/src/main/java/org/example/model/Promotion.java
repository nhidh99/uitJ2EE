package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "price")
    @JsonProperty("price")
    private Long price;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Column(name = "alt")
    @JsonProperty("alt")
    private String alt;

    @Lob
    @Column(name = "image")
    @Basic(fetch = FetchType.LAZY)
    @JsonIgnore
    private byte[] image;

    @Basic(fetch = FetchType.LAZY)
    @Column(name = "record_status")
    @JsonIgnore
    private boolean recordStatus;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "laptop_promotion",
            joinColumns = @JoinColumn(name = "promotion_id"),
            inverseJoinColumns = @JoinColumn(name = "laptop_id"))
    @ToString.Exclude
    @JsonIgnore
    private List<Laptop> laptops;
}