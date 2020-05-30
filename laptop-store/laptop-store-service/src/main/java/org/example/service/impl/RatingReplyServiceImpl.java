package org.example.service.impl;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.RatingDAO;
import org.example.dao.api.RatingReplyDAO;
import org.example.dao.api.UserDAO;
import org.example.input.RatingReplyInput;
import org.example.model.Rating;
import org.example.model.RatingReply;
import org.example.model.Tag;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.RatingReplyService;
import org.example.type.RoleType;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Path("/api/replies")
public class RatingReplyServiceImpl implements RatingReplyService {

    @EJB(mappedName = "RatingReplyDAOImpl")
    RatingReplyDAO ratingReplyDAO;

    @EJB(mappedName = "UserDAOImpl")
    UserDAO userDAO;

    @EJB(mappedName = "RatingDAOImpl")
    RatingDAO ratingDAO;


    @Override
    @POST
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postReply(@QueryParam("rating-id") Integer ratingId, RatingReplyInput ratingReplyInput, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);

            RatingReply ratingReply = buildReplyFromRequestBody(ratingId, ratingReplyInput);
            ratingReply.setUser(user);
            ratingReplyDAO.save(ratingReply);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findByRatingIds(@QueryParam("rating-ids") List<Integer> ratingIds) {
        try {
            List<RatingReply> ratingReplies = ratingReplyDAO.findByRatingIds(ratingIds);
            ObjectMapper om = new ObjectMapper();
            String ratingRepliesJSON = om.writeValueAsString(ratingReplies);
            return Response.ok(ratingRepliesJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private RatingReply buildReplyFromRequestBody(Integer ratingId, RatingReplyInput ratingReplyInput) {
        Rating rating = ratingDAO.findById(ratingId).orElseThrow(BadRequestException::new);
        Date input = new Date();
        LocalDate createdAt = LocalDate.now();
        return RatingReply.builder().rating(rating)
                .reply(ratingReplyInput.getReply()).replyDate(createdAt)
                .build();
    }
}
