package org.example.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "rating_reply")
public class RatingReply {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="rating_id")
    @JsonProperty("rating")
    private Rating rating;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonProperty("user")
    private User user;

    @Column(name="reply")
    @JsonProperty("reply")
    private String reply;

    @Column(name="reply_date")
    @JsonProperty("reply_date")
    private LocalDate replyDate;

}
