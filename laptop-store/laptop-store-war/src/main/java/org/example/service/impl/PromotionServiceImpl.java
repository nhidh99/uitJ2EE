package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.PromotionDAO;
import org.example.model.Promotion;
import org.example.service.api.PromotionService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/promotions")
public class PromotionServiceImpl implements PromotionService {

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    private final ObjectMapper om = new ObjectMapper();

    @Override
    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findPromotionsByPage(@QueryParam("page") @DefaultValue("1") Integer page) {
        try {
            List<Promotion> promotions = promotionDAO.findByPages(page);
            String promotionsJSON = om.writeValueAsString(promotions);
            return Response.ok(promotionsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}