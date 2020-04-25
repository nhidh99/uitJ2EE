package org.example.service.impl;

import org.example.dao.api.PromotionDAO;
import org.example.service.api.ImageService;

import javax.ejb.EJB;
import javax.persistence.NoResultException;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

@Path("/api/images")
public class ImageServiceImpl implements ImageService {

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @Override
    @GET
    @Path("/promotions/{id}/{alt}")
    @Produces("image/jpeg")
    public Response findPromotionImage(@PathParam("id") Integer id,
                                       @PathParam("alt") String alt) {
        byte[] image = promotionDAO.findImageByIdAndAlt(id, alt);
        return Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build();
    }
}