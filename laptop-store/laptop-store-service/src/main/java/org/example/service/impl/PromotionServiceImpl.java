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
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.util.List;

@Path("/api/promotions")
public class PromotionServiceImpl implements PromotionService {

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @EJB(mappedName = "ImageUtilsImpl")
    private ImageUtils imageUtils;

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

    @POST
    @Path("/")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response postPromotion(MultipartBody body) {
        try {
            String name = body.getAttachmentObject("name", String.class);
            Integer quantity = body.getAttachmentObject("quantity", Integer.class);
            Long price = body.getAttachmentObject("price", Long.class);
            Attachment attachment = body.getAttachment("image");
            BufferedImage bufferedImage = ImageIO.read(attachment.getObject(InputStream.class));
            String alt = imageUtils.buildSEOImageName(name) + ".jpg";
            byte[] image = imageUtils.buildBinaryImage(bufferedImage, ImageType.PROMOTION_IMAGE);

            Promotion promotion = Promotion.builder()
                    .name(name).quantity(quantity)
                    .price(price).image(image)
                    .alt(alt).recordStatus(true).build();

            promotionDAO.save(promotion);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}