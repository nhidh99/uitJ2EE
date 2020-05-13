package org.example.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.cxf.jaxrs.ext.multipart.MultipartBody;
import org.example.dao.api.LaptopDAO;
import org.example.dao.api.PromotionDAO;
import org.example.dao.api.TagDAO;
import org.example.filter.LaptopFilter;
import org.example.model.*;
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
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Path("/api/laptops")
public class LaptopServiceImpl implements LaptopService {

    @EJB(mappedName = "LaptopDAOImpl")
    LaptopDAO laptopDAO;

    @EJB(mappedName = "PromotionDAOImpl")
    PromotionDAO promotionDAO;

    @EJB(mappedName = "TagDAOImpl")
    TagDAO tagDAO;

    @EJB(mappedName = "ImageUtilsImpl")
    private ImageUtils imageUtils;

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findLaptops(@BeanParam LaptopFilter laptopFilter) {
        try {
            List<Laptop> laptops = laptopFilter.getIds().isEmpty()
                    ? laptopDAO.findByPage(laptopFilter.getPage())
                    : laptopDAO.findByIds(laptopFilter.getIds());
            ObjectMapper om = new ObjectMapper();
            String laptopsJSON = om.writeValueAsString(laptops);
            return Response.ok(laptopsJSON).build();
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
    @POST
    @Path("/")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response createLaptop(MultipartBody body) {
        try {
            Laptop laptop = buildLaptopFromRequestBody(body);
            laptopDAO.save(laptop);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @Path("/{id}")
    @PUT
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response updateLaptop(@PathParam("id") Integer id, MultipartBody body) {
        try {
            Laptop laptop = buildLaptopFromRequestBody(body);
            laptop.setId(id);
            laptopDAO.save(laptop);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private Laptop buildLaptopFromRequestBody(MultipartBody body) throws IOException, BadRequestException {
        RAM ram = buildRAMFromRequestBody(body);
        CPU cpu = buildCPUFromRequestBody(body);
        HardDrive hardDrive = buildHardDriveFromRequestBody(body);
        Monitor monitor = buildMonitorFromRequestBody(body);

        BrandType brand = body.getAttachmentObject("brand", BrandType.class);
        Integer quantity = body.getAttachmentObject("quantity", Integer.class);

        Long unitPrice = body.getAttachmentObject("unit-price", Long.class);
        Long discountPrice = body.getAttachmentObject("discount-price", Long.class);

        Float thickness = body.getAttachmentObject("thickness", Float.class);
        Float weight = body.getAttachmentObject("weight", Float.class);

        String design = body.getAttachmentObject("design", String.class);
        String graphicsCard = body.getAttachmentObject("graphics-card", String.class);
        String name = body.getAttachmentObject("name", String.class);
        String os = body.getAttachmentObject("os", String.class);
        String ports = body.getAttachmentObject("ports", String.class);

        ObjectMapper om = new ObjectMapper();
        Integer[] promotionIds = om.readValue(body.getAttachmentObject("promotions", String.class), Integer[].class);
        Integer[] tagIds = om.readValue(body.getAttachmentObject("tags", String.class), Integer[].class);

        List<Promotion> promotions = promotionDAO.findByIds(Arrays.asList(promotionIds));
        List<Tag> tags = tagDAO.findByIds(Arrays.asList(tagIds));

        String alt = imageUtils.buildSEOImageName(name);
        InputStream is = body.getAttachmentObject("image", InputStream.class);
        byte[] imageBlob = null, thumbnailBlob = null;
        BufferedImage image = ImageIO.read(is);
        if (image != null) {
            imageBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_IMAGE);
            thumbnailBlob = imageUtils.buildBinaryImage(image, ImageType.LAPTOP_THUMBNAIL);
        }

        return Laptop.builder().alt(alt)
                .brand(brand).cpu(cpu).design(design).discountPrice(discountPrice)
                .graphisCard(graphicsCard).hardDrive(hardDrive).image(imageBlob)
                .monitor(monitor).name(name).os(os).ports(ports).quantity(quantity)
                .ram(ram).recordStatus(true).thickness(thickness)
                .thumbnail(thumbnailBlob).unitPrice(unitPrice).weight(weight)
                .tags(tags).promotions(promotions).build();
    }

    private RAM buildRAMFromRequestBody(MultipartBody body) {
        Integer size = body.getAttachmentObject("ram-size", Integer.class);
        RAMType type = body.getAttachmentObject("ram-type", RAMType.class);
        Integer bus = body.getAttachmentObject("ram-bus", Integer.class);
        Integer extraSlot = body.getAttachmentObject("ram-extra-slot", Integer.class);
        return RAM.builder().size(size).type(type).bus(bus).extraSlot(extraSlot).build();
    }

    private CPU buildCPUFromRequestBody(MultipartBody body) {
        CPUType type = body.getAttachmentObject("cpu-type", CPUType.class);
        String detail = body.getAttachmentObject("cpu-detail", String.class);
        Float speed = body.getAttachmentObject("cpu-speed", Float.class);
        Float maxSpeed = body.getAttachmentObject("cpu-max-speed", Float.class);
        return CPU.builder().type(type).detail(detail).speed(speed).maxSpeed(maxSpeed).build();
    }

    private HardDrive buildHardDriveFromRequestBody(MultipartBody body) {
        HardDriveType type = body.getAttachmentObject("hd-type", HardDriveType.class);
        Integer size = body.getAttachmentObject("hd-size", Integer.class);
        String detail = body.getAttachmentObject("hd-detail", String.class);
        return HardDrive.builder().type(type).size(size).detail(detail).build();
    }

    private Monitor buildMonitorFromRequestBody(MultipartBody body) {
        Float size = body.getAttachmentObject("monitor-size", Float.class);
        ResolutionType type = body.getAttachmentObject("resolution-type", ResolutionType.class);
        Integer resolutionWidth = body.getAttachmentObject("resolution-width", Integer.class);
        Integer resolutionHeight = body.getAttachmentObject("resolution-height", Integer.class);
        return Monitor.builder().size(size)
                .resolutionType(type)
                .resolutionWidth(resolutionWidth)
                .resolutionHeight(resolutionHeight).build();
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
}