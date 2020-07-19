package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.RatingDAO;
import org.example.dao.api.RatingReplyDAO;
import org.example.dao.api.UserDAO;
import org.example.input.RatingInput;
import org.example.input.ReplyInput;
import org.example.model.Laptop;
import org.example.model.Rating;
import org.example.model.RatingReply;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.RatingService;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@Path("/api/ratings")
public class RatingServiceImpl implements RatingService {

    @EJB(mappedName = "RatingDAOImpl")
    private RatingDAO ratingDAO;

    @EJB(mappedName = "UserDAOImpl")
    private UserDAO userDAO;

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @EJB(mappedName = "RatingReplyDAOImpl")
    private RatingReplyDAO ratingReplyDAO;

    @Override
    @POST
    @Path("/")
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response createRating(@QueryParam("product-id") Integer productId,
                                 RatingInput ratingInput,
                                 @Context SecurityContext securityContext) {
        try {
            Rating rating = buildRatingFromRequestBody(productId, ratingInput, securityContext);
            ratingDAO.save(rating);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private Rating buildRatingFromRequestBody(Integer productId, RatingInput ratingInput, SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        Laptop laptop = laptopDAO.findById(productId).orElseThrow(BadRequestException::new);
        String commentTitle = ratingInput.getTitle().isEmpty() ? null : ratingInput.getTitle();
        String commentDetail = ratingInput.getDetail().isEmpty() ? null : ratingInput.getDetail();
        return Rating.builder().laptop(laptop).user(user)
                .rating(ratingInput.getRating())
                .commentTitle(commentTitle)
                .commentDetail(commentDetail)
                .ratingDate(LocalDate.now()).build();
    }

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findRatingsByProductId(@QueryParam("product-id") Integer productId,
                                           @QueryParam("page") @DefaultValue("1") Integer page) {
        try {
            List<Rating> ratings;
            Long ratingCount;
            if (productId != null) {
                ratings = ratingDAO.findByProductId(productId);
                ratingCount = ratingDAO.findTotalRatingByProductId(productId);
            } else {
                ratings = ratingDAO.findByPage(page);
                ratingCount = ratingDAO.findTotalRatingByFilter(null, null);
            }
            ObjectMapper om = new ObjectMapper();
            String ratingsJSON = om.writeValueAsString(ratings);
            return Response.ok(ratingsJSON).header("X-Total-Count", ratingCount).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    @Secured({RoleType.ADMIN})
    public Response findRatingsByFilter(@QueryParam("id") String id,
                                        @QueryParam("status") String status,
                                        @QueryParam("page") Integer page) {
        try {
            List<Rating> ratings = ratingDAO.findByFilter(id, status, page);
            Long ratingCount = ratingDAO.findTotalRatingByFilter(id, status);
            ObjectMapper om = new ObjectMapper();
            String ratingsJSON = om.writeValueAsString(ratings);
            return Response.ok(ratingsJSON).header("X-Total-Count", ratingCount).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.serverError().build();
        }
    }

    @Override
    @DELETE
    @Path("/{id}")
    @Secured({RoleType.ADMIN})
    public Response deleteRating(@PathParam("id") Integer id) {
        try {
            ratingDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/{id}/approve")
    @Secured(RoleType.ADMIN)
    public Response approveRating(@PathParam("id") Integer id) {
        try {
            ratingDAO.approve(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/{id}/deny")
    @Secured(RoleType.ADMIN)
    public Response denyRating(@PathParam("id") Integer id) {
        try {
            ratingDAO.deny(id);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/{id}/replies")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createReply(@PathParam("id") Integer ratingId,
                                ReplyInput replyInput,
                                @Context SecurityContext securityContext) {
        try {
            RatingReply ratingReply = buildReplyFromRequestBody(ratingId, replyInput, securityContext);
            ratingReplyDAO.save(ratingReply);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private RatingReply buildReplyFromRequestBody(Integer ratingId,
                                                  ReplyInput replyInput,
                                                  SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        Rating rating = ratingDAO.findById(ratingId).orElseThrow(BadRequestException::new);
        String reply = replyInput.getReply();
        return RatingReply.builder().user(user).rating(rating).reply(reply).replyDate(LocalDate.now()).build();
    }
}
