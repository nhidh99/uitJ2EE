package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderOverview {
    @JsonProperty("order")
    @JsonIgnoreProperties("user")
    Order order;

    @JsonProperty("first_product")
    OrderDetail firstProduct;

    @JsonProperty("product_count")
    Integer productCount;
}