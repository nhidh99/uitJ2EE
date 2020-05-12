package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class PasswordInput {
    @JsonProperty("oldPassword")
    private String oldPassword;

    @JsonProperty("newPassword")
    private String newPassword;
}
