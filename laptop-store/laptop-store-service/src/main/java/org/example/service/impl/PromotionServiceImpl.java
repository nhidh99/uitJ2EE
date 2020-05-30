package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.dao.api.PromotionDAO;
import org.example.filter.PromotionFilter;
import org.example.type.ImageType;
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
    public Response findPromotions(@BeanParam PromotionFilter promotionFilter) {
        try {
            return promotionFilter.getIds().isEmpty()
                    ? findByPage(promotionFilter.getPage())
                    : findByIds(promotionFilter.getIds());
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Response findByPage(Integer page) throws JsonProcessingException {
        List<Promotion> promotions = (page == null) ? promotionDAO.findAll() : promotionDAO.findByPage(page);
        Long promotionCount = promotionDAO.findTotalPromotions();
        ObjectMapper om = new ObjectMapper();
        String promotionsJSON = om.writeValueAsString(promotions);
        return Response.ok(promotionsJSON).header("X-Total-Count", promotionCount).build();
    }

    private Response findByIds(List<Integer> ids) throws JsonProcessingException {
        List<Promotion> promotions = promotionDAO.findByIds(ids);
        ObjectMapper om = new ObjectMapper();
        String promotionsJSON = om.writeValueAsString(promotions);
        return Response.ok(promotionsJSON).build();
    }

    @Override
    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findPromotionById(@PathParam("id") Integer id) {
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
            promotion.setId(id);
            promotionDAO.save(promotion);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Promotion buildPromotionFromRequestBody(MultipartBody body) throws IOException {
        String name = body.getAttachmentObject("name", String.class);
        Integer quantity = body.getAttachmentObject("quantity", Integer.class);
        Long price = body.getAttachmentObject("price", Long.class);
        InputStream is = body.getAttachmentObject("image", InputStream.class);

        String alt = imageUtils.buildSEOImageName(name);
        BufferedImage image = ImageIO.read(is);
        byte[] imageBlob = (image != null) ? imageUtils.buildBinaryImage(image, ImageType.PROMOTION_IMAGE) : null;
        return Promotion.builder()
                .name(name).price(price)
                .image(imageBlob)
                .quantity(quantity).alt(alt)
                .recordStatus(true).build();
    }

    @Override
    @DELETE
    @Path("/{id}")
    public Response deletePromotionById(@PathParam("id") Integer id) {
        try {
            promotionDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}