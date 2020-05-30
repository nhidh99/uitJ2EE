package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddressInput {
    @JsonProperty("receiverName")
    private String receiverName;

    @JsonProperty("receiverPhone")
    private String receiverPhone;

    @JsonProperty("city")
    private String city;

    @JsonProperty("district")
    private String district;

    @JsonProperty("ward")
    private String ward;

    @JsonProperty("street")
    private String street;

    @JsonProperty("address_num")
    private String addressNum;
}
