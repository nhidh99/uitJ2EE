package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.ProductType;

import javax.persistence.*;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @Column(name = "product_id")
    @JsonProperty("product_id")
    private Integer productId;

    @Column(name = "product_name")
    @JsonProperty("product_name")
    private String productName;

    @Column(name="product_type")
    @JsonProperty("product_type")
    @Enumerated(EnumType.STRING)
    private ProductType productType;

    @Column(name = "quantity")
    @JsonProperty("quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    @JsonProperty("unit_price")
    private Long unitPrice;

    @Column(name = "total_price")
    @JsonProperty("total_price")
    private Long totalPrice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    @JsonIgnore
    @ToString.Exclude
    private Order order;

    public static OrderDetail fromResultSet(ResultSet rs) throws SQLException {
        return OrderDetail.builder()
                .id(rs.getInt("id"))
                .productId(rs.getInt(("product_id")))
                .productName(rs.getString("product_name"))
                .productType(ProductType.valueOf(rs.getString("product_type")))
                .quantity(rs.getInt("quantity"))
                .unitPrice(rs.getLong("unit_price"))
                .totalPrice(rs.getLong("total_price")).build();
    }
}
