package org.example.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name="delivery_address")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "address_num")
    @JsonProperty("address_num")
    private String address_num;

    @Column(name="street")
    @JsonProperty("address_num")
    private String street;

    @Column(name="ward")
    @JsonProperty("ward")
    private String ward;

    @Column(name="district")
    @JsonProperty("district")
    private String district;

    @Column(name="city")
    @JsonProperty("city")
    private String city;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;
}
