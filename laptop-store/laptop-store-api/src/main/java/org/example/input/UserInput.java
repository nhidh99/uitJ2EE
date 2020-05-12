package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserInput {
    @JsonProperty("name")
    private String name;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("birthday")
    private Long birthday;
}
