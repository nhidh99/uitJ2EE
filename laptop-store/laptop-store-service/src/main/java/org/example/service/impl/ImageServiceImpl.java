package org.example.service.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.PromotionDAO;
import org.example.model.Laptop;
import org.example.model.Promotion;
import org.example.service.api.ImageService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

@Path("/api/images/{resolution}")
public class ImageServiceImpl implements ImageService {

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    private static final int LAPTOP_IMAGE_RESOLUTION = 600;
    private static final int LAPTOP_THUMBNAIL_RESOLUTION = 400;
    private static final int PROMOTION_IMAGE_RESOLUTION = 200;

    @Override
    @GET
    @Path("/promotions/{id}/{alt}.jpg")
    @Produces("image/jpeg")
    public Response findPromotionImage(@PathParam("id") Integer id,
                                       @PathParam("alt") String alt,
                                       @PathParam("resolution") Integer resolution) {
        try {
            byte[] image = resolution == PROMOTION_IMAGE_RESOLUTION ? promotionDAO.findImageById(id) : null;
            return (image != null)
                    ? Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/laptops/{id}/{alt}.jpg")
    @Produces("image/jpeg")
    public Response findLaptopImage(@PathParam("id") Integer id,
                                    @PathParam("alt") @DefaultValue("") String alt,
                                    @PathParam("resolution") Integer resolution) {
        try {
            byte[] image;
            switch (resolution) {
                case LAPTOP_IMAGE_RESOLUTION:
                    image = laptopDAO.findImageById(id);
                    break;
                case LAPTOP_THUMBNAIL_RESOLUTION:
                    image = laptopDAO.findThumbnailById(id);
                    break;
                default:
                    image = null;
                    break;
            }
            return (image != null)
                    ? Response.ok(image).header(HttpHeaders.CONTENT_TYPE, "image/jpeg").build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}