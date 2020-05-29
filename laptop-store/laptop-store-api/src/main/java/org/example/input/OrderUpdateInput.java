package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderUpdateInput {
    @JsonProperty("status")
    private String status;
}
