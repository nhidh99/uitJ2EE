package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderInput {
    @JsonProperty("addressId")
    private Integer addressId;

    @JsonProperty("cartJSON")
    private String cartJSON;
}