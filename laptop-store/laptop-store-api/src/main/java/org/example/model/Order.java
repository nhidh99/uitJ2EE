package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.OrderStatus;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "\"order\"")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "transport_fee")
    @JsonProperty("transport_fee")
    private Integer transportFee;

    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Long totalPrice;

    @Column(name = "status")
    @JsonProperty("status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name="order_date")
    @JsonProperty("order_date")
    private LocalDate orderDate;

    @Column(name = "delivery_date")
    @JsonProperty("delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "receiver_name")
    @JsonProperty("receiver_name")
    private String receiverName;

    @Column(name = "receiver_phone")
    @JsonProperty("receiver_phone")
    private String receiverPhone;

    @Column(name = "address_num")
    @JsonProperty("address_num")
    private String addressNum;

    @Column(name = "street")
    @JsonProperty("street")
    private String street;

    @Column(name = "ward")
    @JsonProperty("ward")
    private String ward;

    @Column(name = "district")
    @JsonProperty("district")
    private String district;

    @Column(name = "city")
    @JsonProperty("city")
    private String city;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private List<OrderDetail> orderDetails;
}