package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ReplyInput {
    @JsonProperty("reply")
    private String reply;
}