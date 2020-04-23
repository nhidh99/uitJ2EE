package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    @JsonProperty("id")
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

    @Column(name = "image_link")
    @JsonProperty("image_link")
    private String imageLink;

    @Column(name = "record_status")
    @JsonIgnore
    private boolean recordStatus;
}