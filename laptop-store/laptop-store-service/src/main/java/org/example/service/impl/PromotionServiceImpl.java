package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.dao.api.PromotionDAO;
import org.example.model.ImageType;
import org.example.model.Promotion;
import org.example.service.api.PromotionService;
import org.example.util.api.ImageUtils;

import javax.ejb.EJB;
import javax.imageio.ImageIO;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@Path("/api/promotions")
public class PromotionServiceImpl implements PromotionService {

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @EJB(mappedName = "ImageUtilsImpl")
    private ImageUtils imageUtils;

    @Override
    @Path("/")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findPromotionsByPage(@QueryParam("page") @DefaultValue("1") Integer page) {
        try {
            List<Promotion> promotions = promotionDAO.findByPages(page);
            ObjectMapper om = new ObjectMapper();
            String promotionsJSON = om.writeValueAsString(promotions);
            return Response.ok(promotionsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findPromotionsById(@PathParam("id") Integer id) {
        try {
            Promotion promotion = promotionDAO.findById(id).orElseThrow(BadRequestException::new);
            if (!promotion.isRecordStatus()) throw new BadRequestException();
            ObjectMapper om = new ObjectMapper();
            String promotionJSON = om.writeValueAsString(promotion);
            return Response.ok(promotionJSON).build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response createPromotion(MultipartBody body) {
        try {
            Promotion promotion = buildPromotionFromRequestBody(body);
            promotionDAO.save(promotion);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response updatePromotion(@PathParam("id") Integer id, MultipartBody body) {
        try {
            Promotion promotion = buildPromotionFromRequestBody(body);
            Optional<Promotion> optPromotion = promotionDAO.findById(id);
            if (optPromotion.isPresent()) {
                promotion.setId(id);
                promotionDAO.save(promotion);
            } else {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Promotion buildPromotionFromRequestBody(MultipartBody body) throws IOException {
        String name = body.getAttachmentObject("name", String.class);
        Integer quantity = body.getAttachmentObject("quantity", Integer.class);
        Long price = body.getAttachmentObject("price", Long.class);
        String alt = imageUtils.buildSEOImageName(name) + ".jpg";

        Attachment attachment = body.getAttachment("image");
        BufferedImage bufferedImage = ImageIO.read(attachment.getObject(InputStream.class));
        byte[] image = null;
        if (bufferedImage != null) {
            image = imageUtils.buildBinaryImage(bufferedImage, ImageType.PROMOTION_IMAGE);
        }

        return Promotion.builder()
                .name(name).price(price).image(image)
                .quantity(quantity >= 0 ? quantity : null)
                .alt(alt).recordStatus(true).build();
    }

    @Override
    @DELETE
    @Path("/{id}")
    public Response deletePromotionById(@PathParam("id") Integer id) {
        try {
            Promotion promotion = promotionDAO.findById(id).orElseThrow(BadRequestException::new);
            promotion.setRecordStatus(false);
            promotionDAO.save(promotion);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}