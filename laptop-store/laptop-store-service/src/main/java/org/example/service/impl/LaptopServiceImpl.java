package org.example.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;
import org.apache.cxf.jaxrs.ext.multipart.Multipart;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.PromotionDAO;
import org.example.dao.api.TagDAO;
import org.example.filter.SearchFilter;
import org.example.filter.LaptopFilter;
import org.example.input.LaptopInput;
import org.example.model.*;
import org.example.security.Secured;
import org.example.service.api.LaptopService;
import org.example.type.*;
import org.example.util.api.ImageUtils;

import javax.ejb.EJB;
import javax.imageio.ImageIO;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

@Path("/api/laptops")
public class LaptopServiceImpl implements LaptopService {

    @EJB(mappedName = "LaptopDAOImpl")
    private LaptopDAO laptopDAO;

    @EJB(mappedName = "PromotionDAOImpl")
    private PromotionDAO promotionDAO;

    @EJB(mappedName = "TagDAOImpl")
    private TagDAO tagDAO;

    @EJB(mappedName = "ImageUtilsImpl")
    private ImageUtils imageUtils;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptops(@BeanParam LaptopFilter laptopFilter) {
        try {
            return laptopFilter.getIds().isEmpty()
                    ? findByPage(laptopFilter.getPage())
                    : findByIds(laptopFilter.getIds());
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Response findByPage(Integer page) throws JsonProcessingException {
        List<Laptop> laptops = laptopDAO.findByPage(page);
        Long laptopCount = laptopDAO.findTotalLaptops(null);
        ObjectMapper om = new ObjectMapper();
        String laptopsJSON = om.writeValueAsString(laptops);
        return Response.ok(laptopsJSON).header("X-Total-Count", laptopCount).build();
    }

    private Response findByIds(List<Integer> ids) throws JsonProcessingException {
        List<Laptop> laptops = laptopDAO.findByIds(ids);
        ObjectMapper om = new ObjectMapper();
        String laptopsJSON = om.writeValueAsString(laptops);
        return Response.ok(laptopsJSON).build();
    }

    @Override
    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopsByFilter(@QueryParam("q") String queryParam, @QueryParam("page") Integer page) {
        try {
            List<Laptop> laptops = laptopDAO.findByFilter(queryParam, page);
            Long laptopCount = laptopDAO.findTotalLaptops(queryParam);
            ObjectMapper om = new ObjectMapper();
            String laptopsJSON = om.writeValueAsString(laptops);
            return Response.ok(laptopsJSON).header("X-Total-Count", laptopCount).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopById(@PathParam("id") Integer id) {
        try {
            Optional<Laptop> optLaptop = laptopDAO.findById(id);
            if (optLaptop.isPresent() && optLaptop.get().isRecordStatus()) {
                ObjectMapper om = new ObjectMapper();
                String laptopJSON = om.writeValueAsString(optLaptop.get());
                return Response.ok(laptopJSON).build();
            }
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/result")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopByCondition(@BeanParam SearchFilter searchFilter) {
        try {
            List<Laptop> laptops = laptopDAO.findByCondition(searchFilter);
            ObjectMapper om = new ObjectMapper();
            String laptopsJSON = om.writeValueAsString(laptops);
            return Response.ok(laptopsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/types/{type}")
    public Response findLaptopByType(@PathParam("type") String type,
                                     @QueryParam("page") @DefaultValue("1") Integer page) {
        try {
            List<Laptop> laptops = laptopDAO.findByType(type, page);
            ObjectMapper om = new ObjectMapper();
            String laptopsJSON = om.writeValueAsString(laptops);
            return Response.ok(laptopsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Secured(RoleType.ADMIN)
    public Response createLaptop(@Multipart(value = "details", type = "application/json") LaptopInput laptopInput,
                                 @Multipart(value = "image", type = "image/*") Attachment attachment) {
        try {
            Laptop laptop = buildLaptopFromLaptopRequestBody(laptopInput, attachment);
            laptopDAO.save(laptop);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Secured(RoleType.ADMIN)
    public Response updateLaptop(@PathParam("id") Integer laptopId,
                                 @Multipart(value = "details", type = "application/json") LaptopInput laptopInput,
                                 @Multipart(value = "image", type = "image/*") Attachment attachment) {
        try {
            Laptop laptop = buildLaptopFromLaptopRequestBody(laptopInput, attachment);
            laptop.setId(laptopId);
            laptopDAO.save(laptop);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Laptop buildLaptopFromLaptopRequestBody(LaptopInput laptopInput, Attachment attachment) throws IOException {
        String alt = imageUtils.buildSEOImageName(laptopInput.getName());
        byte[] imageBlob = null, thumbnailBlob = null;
        boolean isEmptyUploadedImages = attachment.getDataHandler().getName().equals("empty.jpg");

        if (!isEmptyUploadedImages) {
            InputStream is = attachment.getDataHandler().getInputStream();
            BufferedImage image = ImageIO.read(is);
            imageBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_IMAGE);
            thumbnailBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_THUMBNAIL);
        }

        List<Promotion> promotions = promotionDAO.findByIds(laptopInput.getPromotionIds());
        List<Tag> tags = tagDAO.findByIds(laptopInput.getTagIds());

        return Laptop.builder()
                .brand(laptopInput.getBrand())
                .design(laptopInput.getDesign())
                .discountPrice(laptopInput.getDiscountPrice())
                .graphisCard(laptopInput.getGraphicsCard())
                .os(laptopInput.getOs())
                .ports(laptopInput.getPorts())
                .quantity(laptopInput.getQuantity())
                .name(laptopInput.getName())
                .thickness(laptopInput.getThickness())
                .unitPrice(laptopInput.getUnitPrice())
                .weight(laptopInput.getWeight())
                .cpu(laptopInput.extractCPU())
                .monitor(laptopInput.extractMonitor())
                .hardDrive(laptopInput.extractHardDrive())
                .ram(laptopInput.extractRAM())
                .tags(tags).promotions(promotions).recordStatus(true)
                .alt(alt).image(imageBlob).thumbnail(thumbnailBlob).build();
    }

    @Override
    @DELETE
    @Path("/{id}")
    public Response deleteLaptop(@PathParam("id") Integer id) {
        try {
            laptopDAO.delete(id);
            return Response.noContent().build();
        } catch (BadRequestException e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/promotions")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findPromotionsById(@PathParam("id") Integer id) {
        try {
            List<Promotion> promotions = promotionDAO.findByLaptopId(id);
            ObjectMapper om = new ObjectMapper();
            String promotionsJSON = om.writeValueAsString(promotions);
            return promotions == null
                    ? Response.status(Response.Status.NOT_FOUND).build()
                    : Response.ok(promotionsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/tags")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findTagsById(@PathParam("id") Integer id) {
        try {
            List<Tag> tags = tagDAO.findByLaptopId(id);
            ObjectMapper om = new ObjectMapper();
            String tagsJSON = om.writeValueAsString(tags);
            return tags == null
                    ? Response.status(Response.Status.BAD_REQUEST).build()
                    : Response.ok(tagsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/{id}/suggestions")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptopSuggestions(@PathParam("id") Integer laptopId) {
        try {
            List<Laptop> laptops = laptopDAO.findSuggestionsByLaptop(laptopId);
            ObjectMapper om = new ObjectMapper();
            String laptopsJSON = om.writeValueAsString(laptops);
            return Response.ok(laptopsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}