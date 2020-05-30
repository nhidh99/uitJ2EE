package org.example.service.api;

import org.example.input.RatingReplyInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

public interface RatingReplyService {
    Response postReply(Integer ratingId, RatingReplyInput ratingReplyInput, SecurityContext securityContext);
    Response findByRatingIds(List<Integer> ratingIds);
}
