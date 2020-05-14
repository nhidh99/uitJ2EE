package org.example.service.api;

import org.example.input.RatingInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface RatingService {
    Response createRating(Integer productId, RatingInput rating, SecurityContext securityContext);
    Response findByProductId(Integer productId);
}
