package org.example.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.dao.api.LaptopDAO;
import org.example.model.Laptop;
import org.example.service.api.LaptopService;

import javax.ejb.EJB;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/api/laptops")
public class LaptopServiceImpl implements LaptopService {

    @EJB(mappedName = "LaptopDAOImpl")
    LaptopDAO laptopDAO;

    @Override
    @GET
    @Path("/")
    public Response findLaptopsByPage(@QueryParam("page") @DefaultValue("1") Integer page) {
        try {
            List<Laptop> laptops = laptopDAO.findByPage(page);
            ObjectMapper om = new ObjectMapper();
            String laptopsJSON = om.writeValueAsString(laptops);
            return Response.ok(laptopsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}