package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.OrderStatus;
import org.example.type.ProductType;

import javax.persistence.*;
import java.sql.ResultSet;
import java.sql.SQLException;
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

    public static Order fromResultSet(ResultSet rs) throws SQLException {
        return Order.builder()
                .id(rs.getInt("id"))
                .transportFee(rs.getInt(("transport_fee")))
                .totalPrice(rs.getLong("total_price"))
                .status(OrderStatus.valueOf(rs.getString("status")))
                .orderDate(rs.getDate("order_date").toLocalDate())
                .deliveryDate(rs.getDate("delivery_date").toLocalDate())
                .receiverName(rs.getString("receiver_name"))
                .receiverPhone(rs.getString("receiver_phone"))
                .addressNum(rs.getString("address_num"))
                .street(rs.getString("street"))
                .ward(rs.getString("ward"))
                .district(rs.getString("district"))
                .city(rs.getString("city"))
                .build();
    }
}