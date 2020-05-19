package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.RatingDAO;
import org.example.dao.api.UserDAO;
import org.example.input.RatingInput;
import org.example.model.Laptop;
import org.example.model.Rating;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.RatingService;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ejb.Local;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.ZoneId;
import java.util.Date;
import java.time.Clock;
import java.time.LocalDate;
import java.util.List;

@Path("/api/ratings")
@Secured({RoleType.ADMIN, RoleType.USER})
public class RatingServiceImpl implements RatingService {

    @EJB(mappedName = "RatingDAOImpl")
    private RatingDAO ratingDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @Override
    @POST
    @Path("/")
    public Response createRating(@QueryParam("product-id") Integer productId,
                                 RatingInput ratingInput,
                                 @Context SecurityContext securityContext) {
        try {
            Rating rating = buildRatingFromRequestBody(productId, ratingInput);
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
            rating.setUser(user);
            ratingDAO.save(rating);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private Rating buildRatingFromRequestBody(Integer productId, RatingInput ratingInput) {
        Laptop laptop = laptopDAO.findById(productId).orElseThrow(BadRequestException::new);
        Date input = new Date();
        LocalDate createdAt = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Rating.builder().laptop(laptop)
                .rating(ratingInput.getRating())
                .commentTitle(ratingInput.getCommentTitle())
                .commentDetail(ratingInput.getCommentDetail())
                .ratingDate(createdAt).build();
    }

    @Override
    @GET
    @Path("/{id}")
    public Response findByProductId(@PathParam("id") Integer productId) {
        try {
            List<Rating> ratings = ratingDAO.findByProductId(productId);
            ObjectMapper om = new ObjectMapper();
            String ratingsJSON = om.writeValueAsString(ratings);
            return Response.ok(ratingsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
