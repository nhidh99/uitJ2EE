package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RatingReplyInput {
    @JsonProperty("reply")
    private String reply;
}
