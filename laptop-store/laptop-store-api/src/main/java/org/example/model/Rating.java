package org.example.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="rating")
@Builder
public class Rating {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonProperty("id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonProperty("user")
    private User user;

    @ManyToOne
    @JoinColumn(name="laptop_id")
    @JsonProperty("laptop")
    private Laptop laptop;

    @Column(name="rating")
    @JsonProperty("rating")
    private Integer rating;

    @Column(name="comment_title")
    @JsonProperty("comment_title")
    private String commentTitle;

    @Column(name="comment_detail")
    @JsonProperty("comment_detail")
    private String commentDetail;

    @Column(name="rating_date")
    @JsonProperty("rating_date")
    private LocalDate ratingDate;

    @Column(name = "approve_status")
    @JsonProperty("approve_status")
    private boolean approveStatus;

    @OneToMany(mappedBy = "rating", fetch = FetchType.EAGER)
    @JsonProperty("replies")
    private List<RatingReply> replies;
}
