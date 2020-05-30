package org.example.input;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class RatingInput {
    @JsonProperty("rating")
    private Integer rating;

    @JsonProperty("comment_title")
    private String commentTitle;

    @JsonProperty("comment_detail")
    private String commentDetail;
}
