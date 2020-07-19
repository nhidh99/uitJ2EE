package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RatingInput {
    @JsonProperty("rating")
    private Integer rating;

    @JsonProperty("title")
    private String title;

    @JsonProperty("detail")
    private String detail;
}