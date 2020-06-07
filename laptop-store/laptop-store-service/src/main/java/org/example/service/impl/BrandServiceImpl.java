package org.example.service.impl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.service.api.BrandService;
import org.example.type.BrandType;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/api/brands")
public class BrandServiceImpl implements BrandService {

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllBrands() {
        try {
            List<String> brands = new ArrayList<String>();
            for(BrandType brandType : BrandType.values()) {
                brands.add(brandType.name());
            }
            ObjectMapper om = new ObjectMapper();
            String tagsJSON = om.writeValueAsString(brands);
            return Response.ok(tagsJSON).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
